# 🔐 Sistema de Autenticação - Lovele

Este diretório contém todas as páginas e componentes relacionados à autenticação do Lovele.

## 📁 Estrutura

```
app/auth/
├── index.tsx          # Página de Login
├── signup.tsx         # Página de Cadastro
└── README.md         # Este arquivo
```

## 🎨 Páginas

### Login (index.tsx)
Página de login com os seguintes recursos:
- ✅ Validação de email e senha
- ✅ Toggle de visibilidade de senha
- ✅ Opção "Esqueceu a senha?"
- ✅ Login via Google e Apple (placeholder)
- ✅ Link para criar nova conta

### Signup (signup.tsx)
Página de cadastro com os seguintes recursos:
- ✅ Formulário completo (Nome, Email, Senha)
- ✅ Validação robusta de campos
- ✅ Indicador de força da senha
- ✅ Confirmação de senha
- ✅ Aceitar termos e condições
- ✅ Link para fazer login

## 🔗 Contexto de Autenticação

A autenticação é gerenciada através de um **Context API** localizado em `app/contexts/AuthContext.tsx`.

### Usando o Hook `useAuth()`

```typescript
import { useAuth } from '../contexts/AuthContext';

export default function MyComponent() {
  const { user, isSignedIn, isLoading, login, signup, logout } = useAuth();

  return (
    // Seu código aqui
  );
}
```

### Propriedades e Métodos

| Propriedade | Tipo | Descrição |
|------------|------|-----------|
| `user` | `User \| null` | Dados do usuário autenticado |
| `isSignedIn` | `boolean` | Se o usuário está autenticado |
| `isLoading` | `boolean` | Se uma operação está em progresso |
| `login(email, password)` | `Promise<void>` | Fazer login |
| `signup(fullName, email, password)` | `Promise<void>` | Criar nova conta |
| `logout()` | `Promise<void>` | Fazer logout |
| `updateProfile(data)` | `Promise<void>` | Atualizar dados do perfil |

## 🔗 Integração com Backend

### Opções Recomendadas

#### 1. **Supabase** (Recomendado)
Oferece autenticação pronta e segura.

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});
```

#### 2. **Firebase Authentication**
Google Firebase fornece uma solução completa de autenticação.

```typescript
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();
await signInWithEmailAndPassword(auth, email, password);
```

#### 3. **API Customizada**
Se você tem seu próprio backend:

```typescript
const response = await fetch('https://seu-api.com/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});

const { token, user } = await response.json();
```

## 🛠️ Como Integrar

### Passo 1: Atualizar o `AuthContext.tsx`

Localize os comentários `TODO` e implemente as chamadas API:

```typescript
// Em app/contexts/AuthContext.tsx

const login = async (email: string, password: string) => {
  setIsLoading(true);
  try {
    // Substitua isto com sua chamada API
    const { user, token } = await api.login(email, password);
    
    // Armazenar token (veja Passo 2)
    await AsyncStorage.setItem('authToken', token);
    
    setUser(user);
  } catch (error) {
    throw error;
  } finally {
    setIsLoading(false);
  }
};
```

### Passo 2: Armazenar Token de Autenticação

Instale o `@react-native-async-storage/async-storage`:

```bash
npm install @react-native-async-storage/async-storage
```

Então, atualize o contexto para armazenar o token:

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

const login = async (email: string, password: string) => {
  // ... fazer login ...
  await AsyncStorage.setItem('authToken', token);
};

const logout = async () => {
  await AsyncStorage.removeItem('authToken');
};

// Na inicialização, recuperar token
useEffect(() => {
  const restoreToken = async () => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      // Validar token com backend
    }
  };
  restoreToken();
}, []);
```

### Passo 3: Proteger Rotas

Envolver a navegação com a verificação de autenticação:

```typescript
// Em App.tsx
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { isSignedIn, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return isSignedIn ? <MainApp /> : <AuthApp />;
}
```

## 🎨 Personalizações

### Cores do Lovele

| Cor | Código | Uso |
|-----|--------|-----|
| Primária | `#FF6B6B` | Botões, links, ênfase |
| Fundo | `#fff` | Background principal |
| Texto | `#333` | Textos principais |
| Texto Leve | `#666` | Textos secundários |
| Borda | `#E0E0E0` | Bordas dos inputs |

Para alterar as cores, atualize os valores nos estilos das páginas.

### Adicionar Logo

```typescript
// Em app/auth/index.tsx ou signup.tsx
import { Image } from 'react-native';

<Image
  source={require('../../assets/logo.png')}
  style={{ width: 100, height: 100 }}
/>
```

## 🧪 Testando

### Testar Localmente

```bash
npm start
# Selecione sua plataforma (ios, android, web)
```

### Dados de Teste

Você pode criar usuários de teste para validar o fluxo:

```javascript
const testUser = {
  email: 'teste@lovele.com',
  password: 'SenhaForte123',
  fullName: 'Usuário Teste',
};
```

## ❌ Tratamento de Erros

O sistema trata automaticamente:
- ✅ Campos vazios
- ✅ Emails inválidos
- ✅ Senhas fracas
- ✅ Senhas não correspondentes
- ✅ Termos não aceitos

Para adicionar tratamento customizado, modifique os `Alert.alert()` nas funções.

## 📦 Dependências

O sistema usa apenas React Native nativo:
- `react-native` - Componentes nativos
- `expo` - Framework Expo

Para autenticação avançada, considere adicionar:
- `@supabase/supabase-js` - Supabase
- `firebase/auth` - Firebase
- `@react-native-async-storage/async-storage` - Armazenar tokens

## 🚀 Próximas Etapas

- [ ] Implementar integração com Supabase/Firebase
- [ ] Adicionar autenticação social (Google, Apple)
- [ ] Implementar "Esqueceu a senha"
- [ ] Adicionar validação de email
- [ ] Implementar autenticação de dois fatores (2FA)
- [ ] Adicionar refresh token automático
- [ ] Criar tela de onboarding pós-registro

## 📞 Suporte

Para dúvidas sobre autenticação, consulte:
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Firebase Auth Docs](https://firebase.google.com/docs/auth)
- [React Native Docs](https://reactnative.dev/docs/intro)
