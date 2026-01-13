import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  containerStyle?: ViewStyle;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'large',
  showText = true,
  containerStyle,
}) => {
  const sizes = {
    small: { fontSize: 20, circleDim: 32 },
    medium: { fontSize: 28, circleDim: 44 },
    large: { fontSize: 36, circleDim: 56 },
  };

  const currentSize = sizes[size];

  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.logoCircle,
          {
            width: currentSize.circleDim,
            height: currentSize.circleDim,
            borderRadius: currentSize.circleDim / 2,
          },
        ]}
      >
        <Text
          style={[
            styles.logoText,
            { fontSize: currentSize.fontSize * 0.6 },
          ]}
        >
          ♥
        </Text>
      </View>
      {showText && (
        <Text
          style={[
            styles.brandName,
            { fontSize: currentSize.fontSize },
          ]}
        >
          Lovele
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 8,
  },
  logoCircle: {
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  brandName: {
    fontWeight: '700',
    color: '#007AFF',
    letterSpacing: 0.5,
  },
});
