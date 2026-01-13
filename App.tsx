import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from './app/contexts/AuthContext';
import LoginScreen from './app/auth/index';
import SignupScreen from './app/auth/signup';

type AuthScreen = 'login' | 'signup';

function AppContent() {
  const { isSignedIn, isLoading } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<AuthScreen>('login');

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
      </View>
    );
  }

  if (!isSignedIn) {
    return (
      <>
        {currentScreen === 'login' ? (
          <LoginScreen onNavigateToSignup={() => setCurrentScreen('signup')} />
        ) : (
          <SignupScreen onNavigateToLogin={() => setCurrentScreen('login')} />
        )}
        <StatusBar style="dark" />
      </>
    );
  }

  // TODO: Adicionar navegação principal após autenticação
  // Aqui você renderizará as telas autenticadas (Home, Profile, Chat, etc)
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
    </View>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
