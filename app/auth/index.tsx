import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { Button, Input } from '../../components/ui';

interface LoginScreenProps {
  onNavigateToSignup?: () => void;
}

export default function LoginScreen({ onNavigateToSignup }: LoginScreenProps) {
  const { login, isLoading: authLoading } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Erro', 'Por favor, insira um email válido');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao fazer login. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Lovele</Text>
          <Text style={styles.subtitle}>Bem-vindo de volta!</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="seu@email.com"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              editable={!loading && !authLoading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Senha</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="••••••••"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              editable={!loading && !authLoading}
            />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                disabled={loading || authLoading}
              >
                <Text style={styles.togglePassword}>
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            disabled={loading}
          >
            <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.loginButton, (loading || authLoading) && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loading || authLoading}
          >
            {loading || authLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>Entrar</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Não tem conta? </Text>
          <TouchableOpacity
            disabled={loading || authLoading}
            onPress={onNavigateToSignup}
          >
            <Text style={styles.signupLink}>Criar conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  formContainer: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#D8E3F0',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#F5F8FB',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#D8E3F0',
    borderRadius: 10,
    paddingHorizontal: 16,
    backgroundColor: '#F5F8FB',
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  togglePassword: {
    fontSize: 18,
    paddingHorizontal: 8,
  },
  forgotPasswordContainer: {
    marginBottom: 24,
  },
  forgotPassword: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    color: '#666',
  },
  signupLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
});
