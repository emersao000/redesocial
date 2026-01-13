import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  placeholder?: string;
  error?: string;
  isPassword?: boolean;
  containerStyle?: ViewStyle;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  error,
  isPassword = false,
  containerStyle,
  icon,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          error && styles.inputContainerError,
        ]}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          style={[styles.input, icon && styles.inputWithIcon]}
          placeholder={placeholder}
          placeholderTextColor="#999"
          secureTextEntry={isPassword && !showPassword}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.toggleButton}
          >
            <Text style={styles.toggleText}>
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#D8E3F0',
    borderRadius: 10,
    paddingHorizontal: 16,
    backgroundColor: '#F5F8FB',
  },
  inputContainerError: {
    borderColor: '#FF3B30',
  },
  iconContainer: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  inputWithIcon: {
    marginLeft: 0,
  },
  toggleButton: {
    paddingHorizontal: 8,
  },
  toggleText: {
    fontSize: 18,
  },
  errorText: {
    fontSize: 12,
    color: '#FF3B30',
    marginTop: 6,
    fontWeight: '500',
  },
});
