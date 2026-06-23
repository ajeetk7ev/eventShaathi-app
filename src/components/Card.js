import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../theme/theme';

export default function Card({
  children,
  onPress,
  style,
  elevation = 'small', // 'small' | 'medium' | 'large'
  padding,
  ...props
}) {
  const cardStyle = [
    styles.card,
    theme.shadows[elevation],
    padding !== undefined && { padding },
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        style={cardStyle}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={cardStyle} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
});
