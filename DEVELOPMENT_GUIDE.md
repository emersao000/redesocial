# 📱 Guia de Desenvolvimento - Lovele

Guia prático para desenvolver no Lovele, mantendo qualidade, consistência e modularidade.

## 🚀 Quick Start

### Instalar dependências

```bash
npm install
```

### Iniciar desenvolvimento

```bash
npm start
```

Selecione sua plataforma:
- `a` → Android
- `i` → iOS
- `w` → Web

## 🏗️ Arquitetura da Aplicação

### Camadas

```
Presentation Layer (UI)
    ↓
Components Layer
    ↓
Context Layer (Estado)
    ↓
Hooks Layer (Lógica)
    ↓
Utils Layer (Helpers)
    ↓
API Layer (Backend)
```

### Responsabilidades

| Camada | Responsabilidade | Exemplo |
|--------|------------------|---------|
| **Presentation** | Renderizar UI | LoginScreen, ProfilePage |
| **Components** | Componentes reutilizáveis | Button, Input, Card |
| **Context** | Estado global | AuthContext, UserContext |
| **Hooks** | Lógica compartilhada | useApi, useAuth |
| **Utils** | Funções auxiliares | validateEmail, formatDate |
| **API** | Chamadas ao backend | authApi.login() |

## 🎯 Guia de Desenvolvimento

### 1️⃣ Criar uma Nova Página

```tsx
// app/posts/index.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { PostList } from '../../components/feed';

export default function PostsScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <PostList userId={user?.id} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
```

### 2️⃣ Criar um Novo Componente

```tsx
// components/feed/PostCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Post } from '../../app/types';
import { Button } from '../ui';

interface PostCardProps {
  post: Post;
  onLike: () => void;
  onComment: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onLike,
  onComment,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.author}>{post.author}</Text>
      <Text style={styles.content}>{post.content}</Text>
      <View style={styles.actions}>
        <Button title="Like" onPress={onLike} variant="outline" />
        <Button title="Comment" onPress={onComment} variant="outline" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
  author: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
});

// components/feed/index.ts
export { PostCard } from './PostCard';
export { PostList } from './PostList';
```

### 3️⃣ Usar Estado Global

```tsx
import { useAuth } from '../contexts/AuthContext';

export default function MyComponent() {
  const { user, isSignedIn, login, logout } = useAuth();

  if (!isSignedIn) {
    return <Text>Faça login primeiro</Text>;
  }

  return <Text>Bem-vindo, {user?.fullName}!</Text>;
}
```

### 4️⃣ Usar Hooks Customizados

```tsx
import { useApi } from '../hooks/useApi';

export default function MyComponent() {
  const { request, loading, error } = useApi();

  const fetchPosts = async () => {
    const posts = await request<Post[]>('/posts');
    // Use posts
  };

  return <Button title={loading ? 'Carregando...' : 'Carregar'} />;
}
```

### 5️⃣ Validar Formulários

```tsx
import {
  validateEmail,
  validatePassword,
  validateLoginForm,
} from '../utils/validation';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleLogin = () => {
    const validation = validateLoginForm(email, password);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    // Fazer login
  };

  return (
    <>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        error={errors.email}
      />
      <Input
        label="Senha"
        value={password}
        onChangeText={setPassword}
        error={errors.password}
        isPassword
      />
      <Button title="Entrar" onPress={handleLogin} />
    </>
  );
}
```

## 📋 Checklist de Qualidade

Antes de fazer commit, verifique:

- [ ] **Tipos**: Todos os componentes têm tipos TypeScript
- [ ] **Props**: Props são bem documentadas
- [ ] **Nomes**: Variáveis, funções e componentes têm nomes descritivos
- [ ] **DRY**: Não há código duplicado
- [ ] **Modularidade**: Componentes têm única responsabilidade
- [ ] **Performance**: Sem renders desnecessários
- [ ] **Acessibilidade**: Componentes têm labels e são navegáveis
- [ ] **Testes**: Componentes podem ser testados
- [ ] **Estilos**: Seguem a paleta de cores do projeto
- [ ] **Erros**: Tratamento de erros adequado

## 🎨 Padrão de Estilos

### Cores

```tsx
import { COLORS } from '../utils/constants';

// Sempre use COLORS
backgroundColor: COLORS.background,
color: COLORS.text,
borderColor: COLORS.border,
```

**Paleta Lovele**:
- Primária: `#007AFF` (Azul)
- Branco: `#FFFFFF`
- Texto: `#1A1A1A`
- Borda: `#D8E3F0`

### Espaçamento

```tsx
// Padding/Margin padrão
16px → Horizontal
20px → Vertical
12px → Entre componentes
8px → Pequenos gaps
```

### Tipografia

```tsx
// Tamanhos
Large (H1): 32px, bold
Medium (H2): 24px, semibold
Normal (Body): 16px, normal
Small: 14px, normal
Tiny: 12px, normal
```

## 🔐 Segurança

### Nunca faça isso:

```tsx
// ❌ Expor tokens
const token = 'sk_live_12345...';

// ❌ Armazenar senhas
await AsyncStorage.setItem('password', password);

// ❌ Log de dados sensíveis
console.log('User token:', authToken);

// ❌ Validação apenas no frontend
if (email.includes('@')) { // NÃO É SEGURO!
  // fazer login
}
```

### Faça isso:

```tsx
// ✅ Use variáveis de ambiente
const apiKey = process.env.EXPO_PUBLIC_API_KEY;

// ✅ Armazene tokens seguros
await AsyncStorage.setItem('authToken', token);

// ✅ Validação no frontend E backend
if (validateEmail(email) && validatePassword(password)) {
  await api.login(email, password);
}

// ✅ Use HTTPS
const API_URL = 'https://api.lovele.com';
```

## 🐛 Debug e Troubleshooting

### Erro: "Cannot find module"

```bash
# Limpe cache e reinstale
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Metro bundler error"

```bash
# Restart do server com cache limpo
npm start -- --reset-cache
```

### Layout estranho

```tsx
// Verifique SafeAreaView
import { SafeAreaView } from 'react-native';

<SafeAreaView style={{ flex: 1 }}>
  {/* Conteúdo */}
</SafeAreaView>
```

### Teclado cobrindo input

```tsx
// Use KeyboardAvoidingView ou AuthLayout
import { AuthLayout } from '../auth/AuthLayout';

<AuthLayout>
  {/* Inputs e formulário */}
</AuthLayout>
```

## 📊 Performance

### Optimize Renders

```tsx
// ❌ Ruim - Re-renderiza sempre
export default function ParentComponent() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Button onPress={() => setCount(count + 1)} />
      <ExpensiveChild /> {/* Re-renderiza sempre */}
    </>
  );
}

// ✅ Bom - Usa useMemo
export default function ParentComponent() {
  const [count, setCount] = useState(0);

  const memoizedChild = useMemo(() => <ExpensiveChild />, []);

  return (
    <>
      <Button onPress={() => setCount(count + 1)} />
      {memoizedChild}
    </>
  );
}
```

### Evite Props Objetos Inline

```tsx
// ❌ Ruim - Novo objeto a cada render
<MyComponent style={{ color: 'red' }} />

// ✅ Bom - Objeto estático
const staticStyle = { color: 'red' };
<MyComponent style={staticStyle} />

// ✅ Melhor - Use StyleSheet
const styles = StyleSheet.create({
  text: { color: 'red' },
});
<MyComponent style={styles.text} />
```

## 🚀 Deploy

### Build para Produção

```bash
# Android
eas build --platform android

# iOS
eas build --platform ios

# Web (Netlify)
npm run build
netlify deploy
```

### Publicar no Expo

```bash
eas submit --platform android
eas submit --platform ios
```

## 📚 Recursos Úteis

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev)
- [Lovele GitHub](https://github.com/lovele)
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
- [AUTHENTICATION_SETUP.md](./AUTHENTICATION_SETUP.md)

## 💬 Comunicação e Boas Práticas

### Commits

```bash
# ✅ Bom
git commit -m "feat: add login validation"
git commit -m "fix: correct button spacing"
git commit -m "refactor: extract Button component"

# ❌ Ruim
git commit -m "update"
git commit -m "fix bug"
git commit -m "changes"
```

### Code Review

Checklist para revisar PR:

- [ ] Código segue padrões do projeto
- [ ] Não há console.log ou debug code
- [ ] Tipos TypeScript estão corretos
- [ ] Componentes são reutilizáveis
- [ ] Performance está otimizada
- [ ] Testes passam (quando aplicável)
- [ ] Documentação foi atualizada

---

**Desenvolvendo o Lovele com qualidade e organização!** 🚀
