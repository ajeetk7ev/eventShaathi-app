import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../theme/theme';

export default function CustomerProfileScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>Customer Profile</Text>
      <Text style={styles.subtitle}>Manage your account details and preferences.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: theme.spacing.lg },
  title: { fontSize: theme.typography.sizes.xl, fontWeight: '700', color: theme.colors.textPrimary },
  subtitle: { fontSize: theme.typography.sizes.sm, color: theme.colors.textSecondary, marginTop: theme.spacing.xs },
});
