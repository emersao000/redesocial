# 🔐 Autenticação - Lovele

Documentação completa do sistema de autenticação modular e bem organizado.

## 📁 Estrutura

```
app/auth/
├── index.tsx           # Página de Login
├── signup.tsx          # Página de Cadastro
├── AuthLayout.tsx      # Layout compartilhado
├── README.md           # Este arquivo
```

## 🎯 Componentes Principais

### Login (`index.tsx`)
- Email e senha
- Validação em tempo real
- Integração com `useAuth` hook
- Uso do `AuthLayout` para consistência

**Props**:
- `onNavigateToSignup`: Callback para navegar para signup

### Signup (`signup.tsx`)
- Nome, email, senha e confirmação
- Indicador de força de senha
- Checkbox de termos
- Integração com `useAuth` hook
- Uso do `AuthLayout` para consistência

**Props**:
- `onNavigateToLogin`: Callback para navegar para login

### AuthLayout (`AuthLayout.tsx`)
Layout compartilhado que encapsula:
- `SafeAreaView` - Protege da barra de navegação
- `KeyboardAvoidingView` - Ajusta quando teclado abre
- `ScrollView` - Permite scroll quando necessário

**Props**:
- `children`: Conteúdo do layout
- `scrollable`: Se deve usar ScrollView (padrão: true)
- `containerStyle`: Estilos customizados

## 🎨 Componentes Reutilizáveis

### Logo (`components/shared/Logo.tsx`)
Componente do logo "Lovele" com coração azul.

```tsx
import { Logo } from '../../components/shared';

<Logo size="medium" showText={true} />
```

**Props**:
- `size`: 'small' | 'medium' | 'large'
- `showText`: Mostrar texto "Lovele"
- `containerStyle`: Estilos customizados

### PasswordVisibilityIcon (`components/shared/PasswordVisibilityIcon.tsx`)
Ícone para toggle de visibilidade de senha.

```tsx
import { PasswordVisibilityIcon } from '../../components/shared';

<PasswordVisibilityIcon
  isVisible={showPassword}
  onPress={() => setShowPassword(!showPassword)}
  disabled={false}
/>
```

**Props**:
- `isVisible`: Se a senha está visível
- `onPress`: Callback ao pressionar
- `disabled`: Se está desativado

### Button (`components/ui/Button.tsx`)
Botão reutilizável com variantes.

```tsx
<Button
  title="Entrar"
  onPress={handleLogin}
  variant="primary"
  size="medium"
  loading={isLoading}
/>
```

**Props**:
- `title`: Texto do botão
- `onPress`: Callback ao pressionar
- `variant`: 'primary' | 'secondary' | 'outline'
- `size`: 'small' | 'medium' | 'large'
- `loading`: Mostrar loading
- `disabled`: Desativar botão

### Input (`components/ui/Input.tsx`)
Input reutilizável com validação.

```tsx
<Input
  label="Email"
  placeholder="seu@email.com"
  value={email}
  onChangeText={setEmail}
  error={emailError}
  keyboardType="email-address"
/>
```

**Props**:
- `label`: Label do input
- `placeholder`: Placeholder
- `error`: Mensagem de erro
- `isPassword`: Se é campo de senha
- Todas as props do TextInput nativo

## 📐 Layout e Espaçamento

O sistema usa um padrão consistente de espaçamento:

```
┌─────────────────────────────┐
│   SafeAreaView              │
│  ┌─────────────────────────┐│
│  │ KeyboardAvoidingView    ││
│  │ ┌─────────────────────┐ ││
│  │ │ ScrollView          │ ││
│  │ │ padding: 20px       │ ││
│  │ │ paddingTop: 24px    │ ││
│  │ │                     │ ││
│  │ │ [Conteúdo]          │ ││
│  │ │                     │ ││
│  │ │ paddingBottom: 20px │ ││
│  │ └─────────────────────┘ ││
│  └─────────────────────────┘│
└─────────────────────────────┘
```

## 🔧 Como Usar

### Criar uma Nova Página de Autenticação

```tsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { AuthLayout } from './AuthLayout';
import { Button, Input } from '../../components/ui';
import { Logo } from '../../components/shared';
import { useAuth } from '../contexts/AuthContext';

export default function NewAuthPage() {
  const { isLoading } = useAuth();
  const [email, setEmail] = useState('');

  return (
    <AuthLayout>
      <View>
        <Logo size="medium" />
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
        />
        <Button
          title="Continuar"
          onPress={handleSubmit}
          loading={isLoading}
        />
      </View>
    </AuthLayout>
  );
}
```

## 🎯 Boas Práticas

✅ **Faça**:
- Use `AuthLayout` para consistência
- Use componentes `Button` e `Input` reutilizáveis
- Mantenha validação separada em `app/utils/validation.ts`
- Use `useAuth` para operações de autenticação
- Documente props de componentes

❌ **Não faça**:
- Não use `SafeAreaView` diretamente (use `AuthLayout`)
- Não crie inputs customizados sem necessidade
- Não misture lógica de autenticação com UI
- Não ignore validações

## 🚀 Próximos Passos

- [ ] Implementar reset de senha
- [ ] Adicionar autenticação biométrica (fingerprint)
- [ ] Implementar login social (Google, Apple)
- [ ] Adicionar 2FA (autenticação de dois fatores)
- [ ] Criar tela de onboarding

## 📞 Troubleshooting

### Teclado cobrindo inputs
→ Use `AuthLayout` (já cuida do `KeyboardAvoidingView`)

### Layout com muito espaço em branco
→ Reduza `paddingTop` em `AuthLayout` ou use `scrollable={false}`

### Inputs com espaçamento inconsistente
→ Use `marginBottom: 20` em `inputGroup` (padrão no `Input`)

## 📚 Referências

- [React Native SafeAreaView](https://reactnative.dev/docs/safeareaview)
- [React Native KeyboardAvoidingView](https://reactnative.dev/docs/keyboardavoidingview)
- [Context API](https://react.dev/reference/react/useContext)
