import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  fullName: string;
  profileImage?: string;
  bio?: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isSignedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simula verificação de sessão ao iniciar o app
  useEffect(() => {
    const checkSession = async () => {
      try {
        // TODO: Verificar sessão armazenada (AsyncStorage, etc)
        // Aqui você poderia recuperar o token do AsyncStorage e validar
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao verificar sessão:', error);
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Integrar com backend de autenticação
      // Exemplo com Supabase:
      // const { data, error } = await supabase.auth.signInWithPassword({
      //   email,
      //   password,
      // });

      // Simulando login bem-sucedido
      const mockUser: User = {
        id: '1',
        email,
        fullName: 'Usuário Teste',
        createdAt: new Date().toISOString(),
      };

      setUser(mockUser);
      // TODO: Armazenar token em AsyncStorage
    } catch (error) {
      console.error('Erro ao fazer login:', error);
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
      // TODO: Integrar com backend de autenticação
      // Exemplo com Supabase:
      // const { data, error } = await supabase.auth.signUp({
      //   email,
      //   password,
      // });

      // Simulando cadastro bem-sucedido
      const mockUser: User = {
        id: '1',
        email,
        fullName,
        createdAt: new Date().toISOString(),
      };

      setUser(mockUser);
      // TODO: Armazenar token em AsyncStorage
    } catch (error) {
      console.error('Erro ao criar conta:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // TODO: Integrar com backend de autenticação
      // Exemplo com Supabase:
      // await supabase.auth.signOut();

      setUser(null);
      // TODO: Limpar token do AsyncStorage
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;

    try {
      // TODO: Integrar com backend para atualizar perfil
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isSignedIn: !!user,
    login,
    signup,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
