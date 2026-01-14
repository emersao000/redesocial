import React, { useEffect } from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Platform,
  ViewStyle,
  View,
  StatusBar,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface AuthLayoutProps {
  children: React.ReactNode;
  scrollable?: boolean;
  containerStyle?: ViewStyle;
  variant?: 'default' | 'gradient' | 'modern';
  showHeader?: boolean;
}

/**
 * Layout profissional para telas de autenticação
 * Inspirado em Instagram, Twitter, LinkedIn
 */
export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  scrollable = true,
  containerStyle,
  variant = 'gradient',
  showHeader = true,
}) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const renderBackground = () => {
    switch (variant) {
      case 'gradient':
        return (
          <LinearGradient
            colors={['#667eea', '#764ba2', '#f093fb']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        );
      case 'modern':
        return (
          <LinearGradient
            colors={['#0f0c29', '#302b63', '#24243e']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        );
      default:
        return <View style={styles.defaultBackground} />;
    }
  };

  const content = (
    <Animated.View
      style={[
        styles.contentWrapper,
        { opacity: fadeAnim },
        containerStyle,
      ]}
    >
      {/* Card branco com bordas arredondadas */}
      <View style={styles.card}>
        {showHeader && (
          <View style={styles.headerDecoration}>
            <View style={styles.pill} />
          </View>
        )}
        {children}
      </View>
    </Animated.View>
  );

  return (
    <>
      <StatusBar
        barStyle={variant === 'default' ? 'dark-content' : 'light-content'}
        backgroundColor="transparent"
        translucent
      />
      <SafeAreaView style={styles.safeArea}>
        {renderBackground()}

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          {scrollable ? (
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              bounces={false}
            >
              {content}
            </ScrollView>
          ) : (
            content
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  defaultBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#F5F7FA',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 10,
  },
  headerDecoration: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: -8,
  },
  pill: {
    width: 40,
    height: 5,
    backgroundColor: '#E1E8ED',
    borderRadius: 3,
  },
});
