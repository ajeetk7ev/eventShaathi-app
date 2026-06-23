import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { theme } from '../theme/theme';
import { useUserStore } from '../store/userStore';

const { width } = Dimensions.get('window');

export default function RoleSelectionScreen() {
  const insets = useSafeAreaInsets();
  const setRole = useUserStore((state) => state.setRole);

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      {/* Decorative background gradients/blobs */}
      <View style={styles.backgroundBlob1} />
      <View style={styles.backgroundBlob2} />

      <View style={styles.content}>
        {/* Logo and Tagline Section */}
        <Animated.View entering={FadeInUp.delay(200).duration(800)} style={styles.header}>
          <View style={styles.logoContainer}>
            <MaterialCommunityIcons name="party-popper" size={48} color={theme.colors.primary} />
          </View>
          <Text style={styles.appName}>EventSaathi</Text>
          <Text style={styles.tagline}>Book Everything For Your Event</Text>
        </Animated.View>

        {/* Role Cards Section */}
        <Animated.View entering={FadeInDown.delay(400).duration(800)} style={styles.cardsContainer}>
          <Text style={styles.subtitle}>Choose your pathway to get started</Text>

          {/* Customer Option Card */}
          <TouchableOpacity
            style={[styles.card, styles.customerCard]}
            onPress={() => setRole('customer')}
            activeOpacity={0.9}
          >
            <View style={styles.cardHeader}>
              <View style={[styles.iconWrapper, { backgroundColor: theme.colors.primaryLight }]}>
                <MaterialCommunityIcons name="calendar-heart" size={28} color={theme.colors.primary} />
              </View>
              <MaterialCommunityIcons name="arrow-right" size={20} color={theme.colors.primary} />
            </View>
            <Text style={styles.cardTitle}>Plan an Event</Text>
            <Text style={styles.cardDescription}>
              Book venues, caterers, photographers, decorators and manage your guest list all in one place.
            </Text>
          </TouchableOpacity>

          {/* Vendor Option Card */}
          <TouchableOpacity
            style={[styles.card, styles.vendorCard]}
            onPress={() => setRole('vendor')}
            activeOpacity={0.9}
          >
            <View style={styles.cardHeader}>
              <View style={[styles.iconWrapper, { backgroundColor: '#E0F2FE' }]}>
                <MaterialCommunityIcons name="storefront" size={28} color="#0284C7" />
              </View>
              <MaterialCommunityIcons name="arrow-right" size={20} color="#0284C7" />
            </View>
            <Text style={styles.cardTitle}>Offer Services</Text>
            <Text style={styles.cardDescription}>
              List your services, manage bookings, message clients, and grow your event business.
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Footer */}
        <Text style={styles.footerText}>
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  backgroundBlob1: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: theme.colors.primaryLight,
    opacity: 0.5,
  },
  backgroundBlob2: {
    position: 'absolute',
    bottom: -150,
    left: -150,
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: theme.colors.surface,
    opacity: 0.8,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  header: {
    alignItems: 'center',
    marginTop: theme.spacing.xl * 2,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.small,
    marginBottom: theme.spacing.md,
  },
  appName: {
    fontSize: theme.typography.sizes.xxxl,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
    fontWeight: '500',
  },
  cardsContainer: {
    width: '100%',
    marginVertical: theme.spacing.xl,
  },
  subtitle: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.small,
  },
  customerCard: {
    borderLeftWidth: 5,
    borderLeftColor: theme.colors.primary,
  },
  vendorCard: {
    borderLeftWidth: 5,
    borderLeftColor: '#0284C7',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  cardDescription: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  footerText: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    opacity: 0.8,
  },
});
