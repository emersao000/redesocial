/**
 * Constantes da aplicação Lovele
 */

// Cores - Paleta Azul Lovele
export const COLORS = {
  primary: '#007AFF',        // Azul forte
  primaryLight: '#5BA3FF',   // Azul médio
  primaryVeryLight: '#E8F4FF', // Azul muito fraco (para botões)
  secondary: '#C0D5FF',      // Azul secundário claro
  background: '#FFFFFF',     // Branco
  surface: '#F5F8FB',        // Branco com toque azul
  text: '#1A1A1A',          // Quase preto
  textSecondary: '#666666',  // Cinza médio
  border: '#D8E3F0',        // Borda azulada
  error: '#FF3B30',         // Vermelho (para erros)
  success: '#34C759',       // Verde
  warning: '#FFA500',       // Laranja
  info: '#007AFF',          // Azul (informação)
  disabled: '#CCCCCC',      // Cinza
} as const;

// Espaçamento
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

// Tipografia
export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  max: 40,
} as const;

export const FONT_WEIGHTS = {
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
} as const;

// Border Radius
export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 10,
  xl: 12,
  round: 999,
} as const;

// Mensagens
export const MESSAGES = {
  auth: {
    loginSuccess: 'Login realizado com sucesso!',
    signupSuccess: 'Conta criada com sucesso!',
    logoutSuccess: 'Desconectado com sucesso',
    loginError: 'Falha ao fazer login. Tente novamente.',
    signupError: 'Falha ao criar conta. Tente novamente.',
    logoutError: 'Falha ao desconectar. Tente novamente.',
    invalidEmail: 'Email inválido',
    invalidPassword: 'Senha inválida',
    passwordMismatch: 'As senhas não coincidem',
    fillAllFields: 'Por favor, preencha todos os campos',
  },
  validation: {
    emailRequired: 'Email é obrigatório',
    passwordRequired: 'Senha é obrigatória',
    nameRequired: 'Nome é obrigatório',
    minimumLength: (min: number) => `Mínimo ${min} caracteres`,
    passwordWeak: 'Senha muito fraca',
    passwordMedium: 'Senha média',
    passwordStrong: 'Senha forte',
  },
} as const;

// Endpoints da API
export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    signup: '/auth/signup',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    me: '/auth/me',
    resetPassword: '/auth/reset-password',
  },
  users: {
    profile: '/users/profile',
    updateProfile: '/users/profile',
    follow: '/users/:id/follow',
    unfollow: '/users/:id/unfollow',
  },
  posts: {
    list: '/posts',
    create: '/posts',
    delete: '/posts/:id',
    like: '/posts/:id/like',
  },
} as const;

// Tamanhos de imagem
export const IMAGE_SIZES = {
  avatar: { width: 48, height: 48 },
  profileCover: { width: 320, height: 150 },
  post: { width: 320, height: 320 },
  thumbnail: { width: 80, height: 80 },
} as const;

// Durações de animação
export const ANIMATION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 500,
  verySlow: 800,
} as const;

// Limite de caracteres
export const CHAR_LIMITS = {
  fullName: 50,
  email: 254,
  bio: 160,
  postCaption: 2200,
  comment: 500,
} as const;

// Validação de senha
export const PASSWORD_REQUIREMENTS = {
  minLength: 6,
  requireUppercase: false,
  requireNumbers: false,
  requireSpecialChars: false,
} as const;

// Delays para simulação
export const DELAYS = {
  shortDelay: 500,
  normalDelay: 1000,
  longDelay: 1500,
} as const;

// URLs externas
export const EXTERNAL_URLS = {
  privacyPolicy: 'https://lovele.com/privacy',
  termsOfService: 'https://lovele.com/terms',
  support: 'https://support.lovele.com',
  documentation: 'https://docs.lovele.com',
} as const;

// Regex patterns
export const REGEX_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  url: /^https?:\/\/.+/,
  username: /^[a-zA-Z0-9_]{3,20}$/,
  phone: /^[0-9]{10,11}$/,
} as const;

// Status HTTP
export const HTTP_STATUS = {
  ok: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  internalError: 500,
} as const;
