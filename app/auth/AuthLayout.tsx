import React from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Platform,
  ViewStyle,
} from 'react-native';

interface AuthLayoutProps {
  children: React.ReactNode;
  scrollable?: boolean;
  containerStyle?: ViewStyle;
}

/**
 * Layout compartilhado para páginas de autenticação
 * Cuida de SafeAreaView, KeyboardAvoidingView e ScrollView
 */
export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  scrollable = true,
  containerStyle,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        {scrollable ? (
          <ScrollView
            contentContainerStyle={[styles.scrollContent, containerStyle]}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        ) : (
          <>{children}</>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
  },
});
