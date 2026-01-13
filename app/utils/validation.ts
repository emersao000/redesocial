/**
 * Validadores para formulários de autenticação
 */

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): {
  isValid: boolean;
  strength: 'weak' | 'medium' | 'strong';
  feedback: string[];
} => {
  const feedback: string[] = [];
  let strength: 'weak' | 'medium' | 'strong' = 'weak';

  if (password.length < 6) {
    feedback.push('A senha deve ter pelo menos 6 caracteres');
  } else if (password.length < 8) {
    strength = 'medium';
  } else {
    strength = 'strong';
  }

  if (!/[A-Z]/.test(password)) {
    feedback.push('Adicione uma letra maiúscula');
  }

  if (!/[0-9]/.test(password)) {
    feedback.push('Adicione um número');
  }

  if (!/[!@#$%^&*]/.test(password)) {
    feedback.push('Adicione um caractere especial (!@#$%^&*)');
  }

  return {
    isValid: feedback.length === 0 && password.length >= 6,
    strength,
    feedback,
  };
};

export const validateFullName = (name: string): boolean => {
  return name.trim().length >= 3;
};

export const validatePasswordMatch = (
  password: string,
  confirmPassword: string
): boolean => {
  return password === confirmPassword && password.length > 0;
};

export interface ValidationErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const validateSignupForm = (
  fullName: string,
  email: string,
  password: string,
  confirmPassword: string
): { isValid: boolean; errors: ValidationErrors } => {
  const errors: ValidationErrors = {};

  if (!validateFullName(fullName)) {
    errors.fullName = 'Nome deve ter pelo menos 3 caracteres';
  }

  if (!validateEmail(email)) {
    errors.email = 'Email inválido';
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.feedback[0];
  }

  if (!validatePasswordMatch(password, confirmPassword)) {
    errors.confirmPassword = 'As senhas não coincidem';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateLoginForm = (
  email: string,
  password: string
): { isValid: boolean; errors: ValidationErrors } => {
  const errors: ValidationErrors = {};

  if (!email) {
    errors.email = 'Email é obrigatório';
  } else if (!validateEmail(email)) {
    errors.email = 'Email inválido';
  }

  if (!password) {
    errors.password = 'Senha é obrigatória';
  } else if (password.length < 6) {
    errors.password = 'Senha deve ter pelo menos 6 caracteres';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Formata mensagens de erro
 */
export const getErrorMessage = (error: any): string => {
  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (error?.message) {
    return error.message;
  }

  return 'Um erro desconhecido ocorreu. Tente novamente.';
};

/**
 * Verifica força da senha
 */
export const getPasswordStrength = (password: string): number => {
  let strength = 0;

  if (password.length >= 6) strength++;
  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[!@#$%^&*]/.test(password)) strength++;

  return Math.min(strength / 5, 1); // Normalizado entre 0 e 1
};

/**
 * Criptografia básica para salvar dados locais (não seguro para produção)
 */
export const simpleEncrypt = (text: string): string => {
  return Buffer.from(text).toString('base64');
};

export const simpleDecrypt = (encoded: string): string => {
  return Buffer.from(encoded, 'base64').toString('utf8');
};
