import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../theme/theme';

export default function Button({
  title,
  onPress,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'text'
  loading = false,
  disabled = false,
  icon,
  style,
  textStyle,
  ...props
}) {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isOutline = variant === 'outline';
  const isText = variant === 'text';

  const buttonStyles = [
    styles.base,
    isPrimary && styles.primary,
    isSecondary && styles.secondary,
    isOutline && styles.outline,
    isText && styles.text,
    disabled && styles.disabled,
    style,
  ];

  const labelStyles = [
    styles.label,
    isPrimary && styles.labelPrimary,
    isSecondary && styles.labelSecondary,
    isOutline && styles.labelOutline,
    isText && styles.labelText,
    disabled && styles.labelDisabled,
    textStyle,
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={buttonStyles}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={isPrimary || isSecondary ? theme.colors.white : theme.colors.primary}
        />
      ) : (
        <View style={styles.content}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={18}
              color={
                disabled
                  ? theme.colors.gray[400]
                  : isPrimary || isSecondary
                  ? theme.colors.white
                  : theme.colors.primary
              }
              style={styles.icon}
            />
          )}
          <Text style={labelStyles}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 48,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: theme.spacing.xs,
  },
  primary: {
    backgroundColor: theme.colors.primary,
    ...theme.shadows.small,
  },
  secondary: {
    backgroundColor: theme.colors.primaryLight,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
  },
  text: {
    backgroundColor: 'transparent',
    height: 'auto',
    paddingHorizontal: 0,
  },
  disabled: {
    backgroundColor: theme.colors.gray[200],
    borderColor: theme.colors.gray[200],
    shadowOpacity: 0,
    elevation: 0,
  },
  label: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semibold,
    textAlign: 'center',
  },
  labelPrimary: {
    color: theme.colors.white,
  },
  labelSecondary: {
    color: theme.colors.primary,
  },
  labelOutline: {
    color: theme.colors.primary,
  },
  labelText: {
    color: theme.colors.primary,
  },
  labelDisabled: {
    color: theme.colors.gray[400],
  },
});
