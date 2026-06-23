import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../theme/theme';

export default function SearchInput({
  value,
  onChangeText,
  placeholder = 'Search venues, caterers, decorators...',
  onFilterPress,
  style,
  ...props
}) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.inputWrapper}>
        <MaterialCommunityIcons
          name="magnify"
          size={22}
          color={theme.colors.textSecondary}
          style={styles.searchIcon}
        />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          style={styles.input}
          {...props}
        />
      </View>
      {onFilterPress && (
        <TouchableOpacity
          onPress={onFilterPress}
          activeOpacity={0.8}
          style={styles.filterButton}
        >
          <MaterialCommunityIcons
            name="tune-variant"
            size={20}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    height: 48,
    paddingHorizontal: theme.spacing.sm,
  },
  searchIcon: {
    marginRight: theme.spacing.xs,
  },
  input: {
    flex: 1,
    height: '100%',
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.md,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: theme.spacing.sm,
  },
});
