import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { Logo } from '../../components/shared';

interface LoginScreenProps {
  onNavigateToSignup?: () => void;
}

export default function LoginScreen({ onNavigateToSignup }: LoginScreenProps) {
  const { login, isLoading: authLoading } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [emailFocused, setEmailFocused] = React.useState(false);
  const [passwordFocused, setPasswordFocused] = React.useState(false);

  // Refs para os inputs
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  // Animações suaves
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 9,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const validateEmail = (text: string) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (text && !emailRegex.test(text)) {
      setEmailError('Email inválido');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (text: string) => {
    setPassword(text);
    if (text && text.length < 6) {
      setPasswordError('Mínimo 6 caracteres');
    } else {
      setPasswordError('');
    }
  };

  const handleLogin = async () => {
    Keyboard.dismiss();

    if (!email || !password) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos');
      return;
    }

    if (emailError || passwordError) {
      Alert.alert('Atenção', 'Por favor, corrija os erros antes de continuar');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Falha ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled =
    loading ||
    authLoading ||
    !email ||
    !password ||
    !!emailError ||
    !!passwordError;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Background minimalista */}
      <View style={styles.backgroundGradient}>
        <View style={styles.circle1} />
        <View style={styles.circle2} />
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <KeyboardAwareScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid={true}
            enableAutomaticScroll={true}
            extraHeight={180}
            extraScrollHeight={180}
            enableResetScrollToCoords={false}
            bounces={false}
          >
            <Animated.View
              style={[
                styles.content,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              {/* Logo e Header */}
              <View style={styles.header}>
                <View style={styles.logoContainer}>
                  <Logo size="large" showText={false} />
                </View>
                <Text style={styles.appName}>Lovele</Text>
                <Text style={styles.subtitle}>Conecte-se com quem você ama</Text>
              </View>

              {/* Formulário direto - sem card */}
              <View style={styles.formContainer}>
                {/* Email Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email</Text>
                  <TouchableWithoutFeedback onPress={() => emailInputRef.current?.focus()}>
                    <View
                      style={[
                        styles.inputContainer,
                        emailFocused && styles.inputFocused,
                        emailError && styles.inputError,
                      ]}
                    >
                      <Ionicons
                        name="mail-outline"
                        size={22}
                        color={emailFocused ? '#007AFF' : '#8E8E93'}
                        style={styles.icon}
                      />
                      <TextInput
                        ref={emailInputRef}
                        style={styles.input}
                        placeholder="seu@email.com"
                        placeholderTextColor="#C7C7CC"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoComplete="email"
                        textContentType="emailAddress"
                        returnKeyType="next"
                        value={email}
                        onChangeText={validateEmail}
                        onFocus={() => setEmailFocused(true)}
                        onBlur={() => setEmailFocused(false)}
                        onSubmitEditing={() => passwordInputRef.current?.focus()}
                        editable={!loading && !authLoading}
                        blurOnSubmit={false}
                      />
                      {email && !emailError && (
                        <Ionicons name="checkmark-circle" size={22} color="#34C759" />
                      )}
                    </View>
                  </TouchableWithoutFeedback>
                  {emailError ? (
                    <View style={styles.errorContainer}>
                      <Ionicons name="alert-circle" size={14} color="#FF3B30" />
                      <Text style={styles.errorText}>{emailError}</Text>
                    </View>
                  ) : null}
                </View>

                {/* Password Input */}
                <View style={styles.inputGroup}>
                  <View style={styles.labelRow}>
                    <Text style={styles.label}>Senha</Text>
                    <TouchableOpacity
                      style={styles.forgotPasswordButton}
                      disabled={loading}
                      activeOpacity={0.6}
                      onPress={() => {
                        Keyboard.dismiss();
                        Alert.alert('Em breve', 'Funcionalidade de recuperação de senha');
                      }}
                    >
                      <Text style={styles.forgotPassword}>Esqueceu?</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableWithoutFeedback onPress={() => passwordInputRef.current?.focus()}>
                    <View
                      style={[
                        styles.inputContainer,
                        passwordFocused && styles.inputFocused,
                        passwordError && styles.inputError,
                      ]}
                    >
                      <Ionicons
                        name="lock-closed-outline"
                        size={22}
                        color={passwordFocused ? '#007AFF' : '#8E8E93'}
                        style={styles.icon}
                      />
                      <TextInput
                        ref={passwordInputRef}
                        style={styles.input}
                        placeholder="••••••••"
                        placeholderTextColor="#C7C7CC"
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoComplete="password"
                        textContentType="password"
                        returnKeyType="done"
                        value={password}
                        onChangeText={validatePassword}
                        onFocus={() => setPasswordFocused(true)}
                        onBlur={() => setPasswordFocused(false)}
                        onSubmitEditing={handleLogin}
                        editable={!loading && !authLoading}
                      />
                      <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        disabled={loading || authLoading}
                        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                        activeOpacity={0.6}
                      >
                        <Ionicons
                          name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                          size={22}
                          color="#8E8E93"
                        />
                      </TouchableOpacity>
                    </View>
                  </TouchableWithoutFeedback>
                  {passwordError ? (
                    <View style={styles.errorContainer}>
                      <Ionicons name="alert-circle" size={14} color="#FF3B30" />
                      <Text style={styles.errorText}>{passwordError}</Text>
                    </View>
                  ) : null}
                </View>

                {/* Botão de Login */}
                <TouchableOpacity
                  style={[
                    styles.loginButton,
                    isButtonDisabled && styles.loginButtonDisabled,
                  ]}
                  onPress={handleLogin}
                  disabled={isButtonDisabled}
                  activeOpacity={0.85}
                >
                  {loading || authLoading ? (
                    <ActivityIndicator color="#FFFFFF" size="small" />
                  ) : (
                    <View style={styles.buttonContent}>
                      <Text style={styles.loginButtonText}>Entrar</Text>
                      <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
                    </View>
                  )}
                </TouchableOpacity>
              </View>

              {/* Footer - Criar conta */}
              <TouchableOpacity
                style={styles.signupContainer}
                disabled={loading || authLoading}
                onPress={() => {
                  Keyboard.dismiss();
                  onNavigateToSignup?.();
                }}
                activeOpacity={0.6}
              >
                <Text style={styles.signupText}>Não tem uma conta? </Text>
                <Text style={styles.signupLink}>Criar conta grátis</Text>
              </TouchableOpacity>
            </Animated.View>
          </KeyboardAwareScrollView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFFFF',
  },
  circle1: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: 'rgba(0, 122, 255, 0.03)',
    top: -150,
    right: -100,
  },
  circle2: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(88, 86, 214, 0.02)',
    bottom: -80,
    left: -80,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 80,
    paddingBottom: 40,
  },
  content: {
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 56,
  },
  logoContainer: {
    marginBottom: 24,
  },
  appName: {
    fontSize: 40,
    fontWeight: '800',
    color: '#1C1C1E',
    marginBottom: 8,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 17,
    color: '#8E8E93',
    fontWeight: '400',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 24,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  forgotPasswordButton: {
    paddingVertical: 4,
  },
  forgotPassword: {
    color: '#007AFF',
    fontSize: 15,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F7',
    borderRadius: 16,
    paddingHorizontal: 18,
    height: 60,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  inputFocused: {
    backgroundColor: '#FFFFFF',
    borderColor: '#007AFF',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  inputError: {
    borderColor: '#FF3B30',
    backgroundColor: '#FFF5F5',
  },
  icon: {
    marginRight: 14,
  },
  input: {
    flex: 1,
    fontSize: 17,
    color: '#1C1C1E',
    paddingVertical: 0,
    fontWeight: '400',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 4,
    gap: 6,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '400',
  },
  loginButton: {
    backgroundColor: '#007AFF',
    borderRadius: 16,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  loginButtonDisabled: {
    opacity: 0.4,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    paddingVertical: 12,
  },
  signupText: {
    fontSize: 16,
    color: '#8E8E93',
  },
  signupLink: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
});
