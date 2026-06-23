import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../theme/theme';
import { useUserStore } from '../../store/userStore';

export default function CustomerHomeScreen() {
  const insets = useSafeAreaInsets();
  const logout = useUserStore((state) => state.logout);

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Customer Portal</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <MaterialCommunityIcons name="logout" size={20} color={theme.colors.error} />
          <Text style={styles.logoutText}>Switch Mode</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <MaterialCommunityIcons name="home-outline" size={64} color={theme.colors.primary} />
        <Text style={styles.welcomeText}>Welcome to EventSaathi</Text>
        <Text style={styles.description}>This is a placeholder for the customer landing page.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  logoutText: {
    color: theme.colors.error,
    fontSize: theme.typography.sizes.xs,
    fontWeight: '600',
    marginLeft: theme.spacing.xs,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  welcomeText: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.md,
    textAlign: 'center',
  },
  description: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },
});
