# 🔐 Guia Completo de Setup de Autenticação - Lovele

Este guia mostra como integrar diferentes provedores de autenticação no Lovele.

## 📋 Sumário

- [Opção 1: Supabase (Recomendado)](#opção-1-supabase)
- [Opção 2: Firebase](#opção-2-firebase)
- [Opção 3: API Customizada](#opção-3-api-customizada)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Armazenamento de Token](#armazenamento-de-token)

---

## Opção 1: Supabase (Recomendado)

Supabase é a opção mais fácil e segura para começar. Oferece autenticação, banco de dados e storage em uma única plataforma.

### 1.1 Criar Projeto Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "Start your project"
3. Conecte sua conta GitHub ou crie uma nova
4. Crie um novo projeto com os dados:
   - **Project Name**: `lovele`
   - **Database Password**: Salve este password
   - **Region**: Escolha a mais próxima

### 1.2 Instalar SDK

```bash
npm install @supabase/supabase-js
```

### 1.3 Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
EXPO_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=seu-anon-key-aqui
```

Para encontrar essas chaves:
- Vá para Settings > API no Supabase
- Copie a URL do projeto e a "anon" key

### 1.4 Atualizar AuthContext.tsx

```typescript
// app/contexts/AuthContext.tsx
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Atualizar as funções de login/signup:
const login = async (email: string, password: string) => {
  setIsLoading(true);
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Buscar dados completos do usuário
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    setUser({
      id: data.user.id,
      email: data.user.email!,
      fullName: profile?.full_name || '',
      createdAt: data.user.created_at,
    });
  } catch (error) {
    throw error;
  } finally {
    setIsLoading(false);
  }
};

const signup = async (
  fullName: string,
  email: string,
  password: string
) => {
  setIsLoading(true);
  try {
    // Criar usuário
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    // Criar perfil
    await supabase.from('profiles').insert([
      {
        id: data.user!.id,
        full_name: fullName,
        email: email,
      },
    ]);

    setUser({
      id: data.user!.id,
      email,
      fullName,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    throw error;
  } finally {
    setIsLoading(false);
  }
};

const logout = async () => {
  setIsLoading(true);
  try {
    await supabase.auth.signOut();
    setUser(null);
  } catch (error) {
    throw error;
  } finally {
    setIsLoading(false);
  }
};
```

### 1.5 Criar Tabela de Profiles

No Supabase, vá para SQL Editor e execute:

```sql
create table profiles (
  id uuid references auth.users on delete cascade,
  full_name text,
  email text,
  bio text,
  profile_image text,
  followers_count integer default 0,
  following_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (id)
);

alter table profiles enable row level security;

-- Políticas de segurança
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );
```

---

## Opção 2: Firebase

Firebase é outra excelente opção, especialmente se você quer usar outros serviços Firebase.

### 2.1 Criar Projeto Firebase

1. Vá para [firebase.google.com](https://firebase.google.com)
2. Clique em "Acessar o console"
3. Crie um novo projeto
4. Habilite a autenticação por email/senha

### 2.2 Instalar SDK

```bash
npm install firebase
```

### 2.3 Configurar Variáveis

Crie `.env.local`:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=sua-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=seu-projeto
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu-id
EXPO_PUBLIC_FIREBASE_APP_ID=seu-app-id
```

### 2.4 Atualizar AuthContext.tsx

```typescript
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const login = async (email: string, password: string) => {
  setIsLoading(true);
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    setUser({
      id: user.uid,
      email: user.email!,
      fullName: user.displayName || '',
      createdAt: user.metadata?.creationTime || new Date().toISOString(),
    });
  } catch (error) {
    throw error;
  } finally {
    setIsLoading(false);
  }
};

const signup = async (
  fullName: string,
  email: string,
  password: string
) => {
  setIsLoading(true);
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    setUser({
      id: user.uid,
      email,
      fullName,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    throw error;
  } finally {
    setIsLoading(false);
  }
};

const logout = async () => {
  setIsLoading(true);
  try {
    await signOut(auth);
    setUser(null);
  } catch (error) {
    throw error;
  } finally {
    setIsLoading(false);
  }
};
```

---

## Opção 3: API Customizada

Se você tem seu próprio backend (Node.js, Django, etc), siga este guia.

### 3.1 Instalar Async Storage

```bash
npm install @react-native-async-storage/async-storage
```

### 3.2 Configurar Variáveis

```env
EXPO_PUBLIC_API_URL=https://seu-api.com
```

### 3.3 Atualizar AuthContext.tsx

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

const login = async (email: string, password: string) => {
  setIsLoading(true);
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const { user, token } = await response.json();
    
    // Armazenar token
    await AsyncStorage.setItem('authToken', token);
    setUser(user);
  } catch (error) {
    throw error;
  } finally {
    setIsLoading(false);
  }
};

const signup = async (
  fullName: string,
  email: string,
  password: string
) => {
  setIsLoading(true);
  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const { user, token } = await response.json();
    
    await AsyncStorage.setItem('authToken', token);
    setUser(user);
  } catch (error) {
    throw error;
  } finally {
    setIsLoading(false);
  }
};

const logout = async () => {
  setIsLoading(true);
  try {
    const token = await AsyncStorage.getItem('authToken');
    
    await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    await AsyncStorage.removeItem('authToken');
    setUser(null);
  } catch (error) {
    throw error;
  } finally {
    setIsLoading(false);
  }
};
```

---

## Variáveis de Ambiente

### Criar .env.local

Na raiz do projeto, crie um arquivo `.env.local`:

```env
# Supabase
EXPO_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key

# OU Firebase
EXPO_PUBLIC_FIREBASE_API_KEY=sua-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=seu-projeto

# OU API Customizada
EXPO_PUBLIC_API_URL=https://seu-api.com
```

### Acessar Variáveis

```typescript
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const firebaseKey = process.env.EXPO_PUBLIC_FIREBASE_API_KEY;
```

⚠️ **Importante**: Variáveis sem o prefixo `EXPO_PUBLIC_` não serão expostas no app.

---

## Armazenamento de Token

### Instalação

```bash
npm install @react-native-async-storage/async-storage
```

### Uso

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Salvar
await AsyncStorage.setItem('authToken', token);

// Recuperar
const token = await AsyncStorage.getItem('authToken');

// Remover
await AsyncStorage.removeItem('authToken');

// Verificar na inicialização
useEffect(() => {
  const restoreToken = async () => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      // Validar token com backend
      setUser(await validateToken(token));
    }
    setIsLoading(false);
  };
  restoreToken();
}, []);
```

---

## 🧪 Testando a Autenticação

### 1. Testar Localmente

```bash
npm start
```

Selecione sua plataforma (iOS, Android ou Web).

### 2. Testar com Usuário de Teste

Use a conta de teste:
```
Email: teste@lovele.com
Senha: SenhaForte123!
```

### 3. Validar Token

```typescript
const validateToken = async (token: string) => {
  const response = await fetch(`${API_URL}/auth/me`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return response.json();
};
```

---

## ⚠️ Segurança

### Boas Práticas

✅ **Faça**:
- Use HTTPS em produção
- Armazene tokens no AsyncStorage
- Valide tokens no backend
- Use refresh tokens
- Implemente CSRF protection

❌ **Não faça**:
- Armazene senhas no localStorage
- Envie tokens em URLs
- Exponha secrets públicos
- Confie apenas em validação frontend

---

## 📚 Recursos

- [Supabase Docs](https://supabase.com/docs)
- [Firebase Docs](https://firebase.google.com/docs)
- [React Native AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [JWT Auth Guide](https://jwt.io/introduction)

---

## 🆘 Troubleshooting

### Erro: "Cannot find module '@supabase/supabase-js'"

```bash
npm install @supabase/supabase-js
```

### Erro: "Token expirado"

Implemente refresh token:

```typescript
const refreshToken = async (refreshToken: string) => {
  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
  });
  const { token } = await response.json();
  await AsyncStorage.setItem('authToken', token);
};
```

### Login não funciona

1. Verifique as variáveis de ambiente
2. Verifique a URL da API
3. Verifique os headers da requisição
4. Veja os logs do servidor

---

Pronto! Escolha uma das opções acima e comece a integrar autenticação ao Lovele! 🚀
