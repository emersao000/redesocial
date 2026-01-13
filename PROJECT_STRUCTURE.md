# 📐 Estrutura do Projeto Lovele

Guia completo sobre como o projeto está organizado e como adicionar novas features.

## 🏗️ Arquitetura Geral

```
lovele/
├── app/                          # Aplicação React Native Expo
│   ├── auth/                     # 🔐 Autenticação
│   │   ├── index.tsx             # Página de Login
│   │   ├── signup.tsx            # Página de Cadastro
│   │   ├── AuthLayout.tsx        # Layout compartilhado
│   │   └── README.md
│   │
│   ├── contexts/                 # 🔄 Context API (Estado Global)
│   │   └── AuthContext.tsx       # Context de autenticação
│   │
│   ├── hooks/                    # 🪝 Hooks Customizados
│   │   ├── useApi.ts             # Hook para chamadas API
│   │   └── index.ts
│   │
│   ├── utils/                    # 🛠️ Utilidades
│   │   ├── validation.ts         # Validadores de formulários
│   │   ├── constants.ts          # Constantes (cores, mensagens)
│   │   └── index.ts
│   │
│   ├── types/                    # 📝 TypeScript Types
│   │   └── index.ts              # Tipos compartilhados
│   │
│   └── components/               # Componentes específicos do app
│       └── index.ts
│
├── components/                   # 🎨 Componentes Reutilizáveis
│   ├── ui/                       # UI Base (Button, Input, etc)
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── index.ts
│   │
│   ├── shared/                   # Componentes Compartilhados
│   │   ├── Logo.tsx              # Logo do Lovele
│   │   ├── PasswordVisibilityIcon.tsx
│   │   └── index.ts
│   │
│   ├── chat/                     # Componentes de Chat
│   ├── feed/                     # Componentes do Feed
│   ├── profile/                  # Componentes de Perfil
│   ├── stories/                  # Componentes de Stories
│   ├── recados/                  # Componentes de Recados
│   └── index.ts
│
├── assets/                       # 🖼️ Imagens e Ícones
├── App.tsx                       # App principal
├── app.json                      # Configuração Expo
├── package.json
└── tsconfig.json
```

## 🧩 Padrões e Convenções

### 1️⃣ **Componentes de UI** (`components/ui/`)

Componentes base, reutilizáveis em qualquer lugar.

```tsx
// ✅ BOM - Componente de UI puro
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ title, onPress, variant }) => {
  return <TouchableOpacity onPress={onPress}>
    <Text>{title}</Text>
  </TouchableOpacity>;
};
```

### 2️⃣ **Componentes Compartilhados** (`components/shared/`)

Componentes que aparecem em múltiplas páginas.

```tsx
// ✅ BOM - Componente reutilizável em várias páginas
export const Header: React.FC = () => {
  return <Logo size="small" />;
};
```

### 3️⃣ **Componentes de Feature** (`components/feed/`, `components/chat/`, etc)

Componentes específicos de uma feature.

```tsx
// ✅ BOM - Componente específico de Feed
export const FeedPost: React.FC<PostProps> = ({ post }) => {
  // Lógica e UI do Post
};
```

### 4️⃣ **Hooks Customizados** (`app/hooks/`)

Lógica reutilizável em múltiplos componentes.

```tsx
// ✅ BOM - Hook que encapsula lógica
export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const request = async (endpoint) => {
    // Lógica de request
  };
  return { request, loading };
};
```

### 5️⃣ **Contextos** (`app/contexts/`)

Estado global da aplicação.

```tsx
// ✅ BOM - Context para estado global
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null);
  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};
```

## 🎯 Como Adicionar uma Nova Feature

### Exemplo: Criar página de Perfil

#### 1. Criar estrutura de pastas

```bash
# Criar componentes da feature
mkdir components/profile

# Criar página no app
touch app/profile/index.tsx
```

#### 2. Criar componentes

```tsx
// components/profile/ProfileHeader.tsx
export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  return (
    <View style={styles.container}>
      {/* UI */}
    </View>
  );
};

// components/profile/ProfileTabs.tsx
export const ProfileTabs: React.FC<ProfileTabsProps> = ({ activeTab }) => {
  return (
    <View style={styles.container}>
      {/* Tabs */}
    </View>
  );
};

// components/profile/index.ts
export { ProfileHeader } from './ProfileHeader';
export { ProfileTabs } from './ProfileTabs';
```

#### 3. Criar página

```tsx
// app/profile/index.tsx
import React from 'react';
import { View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { ProfileHeader, ProfileTabs } from '../../components/profile';

export default function ProfileScreen() {
  const { user } = useAuth();

  return (
    <View>
      <ProfileHeader user={user} />
      <ProfileTabs activeTab="posts" />
    </View>
  );
}
```

#### 4. Atualizar App.tsx

```tsx
// App.tsx
import ProfileScreen from './app/profile';

export default function App() {
  const { isSignedIn } = useAuth();

  return isSignedIn ? <ProfileScreen /> : <AuthScreen />;
}
```

## 📦 Importações

### ✅ Corretas

```tsx
// De componentes UI
import { Button, Input } from '../../components/ui';

// De componentes compartilhados
import { Logo, Header } from '../../components/shared';

// De contextos
import { useAuth } from '../contexts/AuthContext';

// De hooks
import { useApi } from '../hooks';

// De utilidades
import { validateEmail } from '../utils/validation';
import { COLORS } from '../utils/constants';

// De tipos
import type { User } from '../types';
```

### ❌ Erradas

```tsx
// ❌ Importar implementação de componentes diretos
import Button from '../../components/ui/Button'; // Use index.ts

// ❌ Importar de pastas erradas
import { Button } from '../components'; // Não existe em app/

// ❌ Importações circulares
// Evite contextos importando componentes que importam contextos
```

## 🎨 Padrão de Estilos

Usamos `StyleSheet` do React Native para todos os estilos.

```tsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
});
```

### Paleta de Cores

```tsx
import { COLORS } from '../utils/constants';

// Usar sempre do constants.ts
backgroundColor: COLORS.background,
color: COLORS.text,
borderColor: COLORS.border,
```

## 🔄 Fluxo de Dados

```
App.tsx
  └── AuthProvider (Context)
      ├── LoginScreen
      │   ├── Button (component/ui)
      │   ├── Input (component/ui)
      │   └── useAuth hook
      │
      └── ProfileScreen
          ├── ProfileHeader (component/profile)
          ├── ProfileTabs (component/profile)
          └── useAuth hook
```

## 🛡️ Validação e Tipagem

Sempre use tipos TypeScript:

```tsx
// ✅ BOM
interface LoginProps {
  onSuccess: () => void;
}

export const LoginScreen: React.FC<LoginProps> = ({ onSuccess }) => {
  // ...
};

// ❌ RUIM
export const LoginScreen = ({ onSuccess }) => {
  // ...
};
```

## 📝 Padrão de Nomeação

| O quê | Padrão | Exemplo |
|-------|--------|---------|
| Componentes | PascalCase | `LoginScreen.tsx`, `ProfileHeader.tsx` |
| Funções | camelCase | `validateEmail()`, `handleLogin()` |
| Variáveis | camelCase | `isLoading`, `userName` |
| Constantes | UPPER_SNAKE_CASE | `MAX_LENGTH`, `API_URL` |
| Tipos | PascalCase | `UserProfile`, `LoginProps` |
| Pastas | lowercase | `app/auth`, `components/ui` |

## 🧪 Testes e Build

```bash
# Iniciar dev
npm start

# Build para Android
npm run android

# Build para iOS
npm run ios

# Build para Web
npm run web
```

## 🚀 Deployment

1. Incrementar versão em `app.json`
2. Build do app
3. Deploy via EAS (Expo Application Services)
4. Deploy da web via Netlify

## 📊 Diagrama de Decisão: Onde Colocar Código?

```
┌─ É um componente de UI base?
│  └─ SIM → components/ui/
│
├─ É usado em múltiplas páginas?
│  └─ SIM → components/shared/
│
├─ É específico de uma feature?
│  └─ SIM → components/{feature}/
│
├─ É uma página da aplicação?
│  └─ SIM → app/{feature}/index.tsx
│
├─ É estado global?
│  └─ SIM → app/contexts/
│
├─ É lógica reutilizável?
│  └─ SIM → app/hooks/
│
└─ É função utilidade?
   └─ SIM → app/utils/
```

## 💡 Dicas

1. **Prefira composição**: Combine componentes pequenos em maiores
2. **DRY (Don't Repeat Yourself)**: Se usar 2x, extraia para componente
3. **Nomes descritivos**: `UserProfileCard` é melhor que `Card`
4. **Props documentadas**: Use comentários JSDoc em componentes
5. **Testes primeiro**: Pense em como testar antes de implementar

## 📚 Recursos

- [React Native Docs](https://reactnative.dev)
- [Expo Docs](https://docs.expo.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Context API Guide](https://react.dev/reference/react/useContext)

---

**Mantendo o projeto organizado, modular e de fácil entendimento!** ✨
