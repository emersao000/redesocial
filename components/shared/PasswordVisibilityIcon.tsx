import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface PasswordVisibilityIconProps {
  isVisible: boolean;
  onPress: () => void;
  disabled?: boolean;
}

/**
 * Componente para toggling de visibilidade de senha
 * Mostra um ícone visual melhor que emoji
 */
export const PasswordVisibilityIcon: React.FC<PasswordVisibilityIconProps> = ({
  isVisible,
  onPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, disabled && styles.disabled]}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Text style={styles.icon}>
        {isVisible ? '●̸' : '●'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  icon: {
    fontSize: 20,
    color: '#007AFF',
    fontWeight: 'bold',
  },
});
