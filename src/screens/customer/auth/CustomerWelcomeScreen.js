import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { theme } from '../../../theme/theme';
import Button from '../../../components/Button';
import { useUserStore } from '../../../store/userStore';

const { width } = Dimensions.get('window');

export default function CustomerWelcomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const logout = useUserStore((state) => state.logout);

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      {/* Top Bar with back button */}
      <View style={styles.topBar}>
        <Button
          title="Back"
          variant="text"
          icon="arrow-left"
          onPress={logout}
          textStyle={styles.backButtonText}
        />
      </View>

      {/* Hero Illustration Section */}
      <Animated.View entering={FadeInUp.delay(100).duration(800)} style={styles.heroContainer}>
        <View style={styles.illustrationCard}>
          <View style={styles.circleBg} />
          <MaterialCommunityIcons name="party-popper" size={80} color={theme.colors.primary} />
          <View style={styles.sparkle1}>
            <MaterialCommunityIcons name="sparkles" size={24} color="#F59E0B" />
          </View>
          <View style={styles.sparkle2}>
            <MaterialCommunityIcons name="heart" size={20} color="#EC4899" />
          </View>
        </View>
      </Animated.View>

      {/* Intro Text Section */}
      <Animated.View entering={FadeInUp.delay(300).duration(800)} style={styles.textContainer}>
        <Text style={styles.title}>Plan Your Dream Event</Text>
        <Text style={styles.subtitle}>
          Discover the top-rated venues, caterers, photographers, and decorators in your city.
        </Text>
      </Animated.View>

      {/* CTA Buttons */}
      <Animated.View entering={FadeInDown.delay(500).duration(800)} style={styles.ctaContainer}>
        <Button
          title="Login to Account"
          variant="primary"
          onPress={() => navigation.navigate('Login')}
          style={styles.mainButton}
        />
        <Button
          title="Create New Account"
          variant="outline"
          onPress={() => navigation.navigate('Signup')}
          style={styles.mainButton}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
  },
  backButtonText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.sm,
  },
  heroContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1.2,
  },
  illustrationCard: {
    width: width * 0.75,
    height: width * 0.75,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl * 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    position: 'relative',
    ...theme.shadows.medium,
  },
  circleBg: {
    position: 'absolute',
    width: '65%',
    height: '65%',
    borderRadius: 9999,
    backgroundColor: theme.colors.primaryLight,
    opacity: 0.6,
  },
  sparkle1: {
    position: 'absolute',
    top: '20%',
    left: '20%',
  },
  sparkle2: {
    position: 'absolute',
    bottom: '22%',
    right: '22%',
  },
  textContainer: {
    alignItems: 'center',
    marginVertical: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: theme.typography.weights.extrabold,
    color: theme.colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
    lineHeight: 22,
    paddingHorizontal: theme.spacing.md,
  },
  ctaContainer: {
    width: '100%',
    marginBottom: theme.spacing.lg,
  },
  mainButton: {
    marginBottom: theme.spacing.sm,
    width: '100%',
  },
});
