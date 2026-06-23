import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInUp, ZoomIn } from 'react-native-reanimated';
import { theme } from '../../theme/theme';
import Button from '../../components/Button';
import Card from '../../components/Card';

const { width } = Dimensions.get('window');

export default function BookingSuccessScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { bookingId, vendorName, selectedDate } = route.params;

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.content}>
        {/* Animated Check icon */}
        <Animated.View entering={ZoomIn.delay(200).duration(600)} style={styles.successIconWrapper}>
          <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={80} color={theme.colors.success} />
        </Animated.View>

        {/* Text Details */}
        <Animated.View entering={FadeInUp.delay(300).duration(600)} style={styles.header}>
          <Text style={styles.title}>Request Submitted!</Text>
          <Text style={styles.subtitle}>
            Your request has been successfully sent to the vendor. They will review and confirm availability.
          </Text>
        </Animated.View>

        {/* Detail breakdown Card */}
        <Animated.View entering={FadeInUp.delay(400).duration(600)} style={styles.cardWrapper}>
          <Card style={styles.summaryCard} elevation="small">
            <Text style={styles.cardTitle}>Booking Information</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Vendor Name:</Text>
              <Text style={styles.summaryValue}>{vendorName}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Event Date:</Text>
              <Text style={styles.summaryValue}>{selectedDate}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Reference ID:</Text>
              <Text style={[styles.summaryValue, styles.boldRef]}>{bookingId}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Status:</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusBadgeText}>Pending Vendor Approval</Text>
              </View>
            </View>
          </Card>
        </Animated.View>
      </View>

      {/* Redirect Buttons */}
      <Animated.View entering={FadeInUp.delay(500).duration(600)} style={styles.footer}>
        <Button
          title="Go to My Bookings"
          variant="primary"
          icon="calendar-text"
          onPress={() => {
            // Navigate to Bookings tab (sibling of Explore stack)
            navigation.navigate('Bookings');
          }}
          style={styles.mainBtn}
        />
        <Button
          title="Back to Explore"
          variant="outline"
          onPress={() => {
            // Navigate back to the home page of the explore stack
            navigation.navigate('CustomerHome');
          }}
          style={styles.mainBtn}
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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIconWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: theme.typography.weights.extrabold,
    color: theme.colors.textPrimary,
  },
  subtitle: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
    lineHeight: 22,
    paddingHorizontal: theme.spacing.sm,
  },
  cardWrapper: {
    width: '100%',
  },
  summaryCard: {
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  cardTitle: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingBottom: theme.spacing.xs,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  summaryLabel: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
  },
  summaryValue: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.textPrimary,
  },
  boldRef: {
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.bold,
  },
  statusBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.xs,
  },
  statusBadgeText: {
    color: theme.colors.warning,
    fontSize: 10,
    fontWeight: theme.typography.weights.bold,
  },
  footer: {
    width: '100%',
    marginBottom: theme.spacing.lg,
  },
  mainBtn: {
    marginBottom: theme.spacing.sm,
    width: '100%',
  },
});
