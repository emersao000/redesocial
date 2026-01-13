// Tipos de autenticação
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Tipos de usuário
export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  profileImage?: string;
  bio?: string;
  followers: number;
  following: number;
  createdAt: string;
  updatedAt: string;
}

// Tipos de resposta da API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface AuthResponse {
  user: UserProfile;
  token: string;
  refreshToken: string;
}
