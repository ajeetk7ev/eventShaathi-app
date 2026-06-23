import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../theme/theme';
import { useUserStore } from '../../store/userStore';
import Card from '../../components/Card';

export default function CustomerBookingsScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const bookings = useUserStore((state) => state.bookings);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'pending':
        return { bg: '#FEF3C7', text: theme.colors.warning, label: 'Pending Vendor' };
      case 'confirmed':
        return { bg: '#D1FAE5', text: theme.colors.success, label: 'Confirmed' };
      default:
        return { bg: theme.colors.gray[100], text: theme.colors.textSecondary, label: status };
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Bookings</Text>
        <Text style={styles.subtitle}>Track your event service request statuses</Text>
      </View>

      {/* Bookings List */}
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const statusStyle = getStatusStyle(item.status);
          return (
            <Card style={styles.bookingCard} elevation="small">
              <View style={styles.cardHeader}>
                <Image source={{ uri: item.vendorImage }} style={styles.vendorImage} />
                <View style={styles.vendorMeta}>
                  <Text style={styles.vendorName} numberOfLines={1}>{item.vendorName}</Text>
                  <Text style={styles.categoryText}>{item.vendorCategory}</Text>
                  <View style={styles.dateRow}>
                    <MaterialCommunityIcons name="calendar" size={14} color={theme.colors.textSecondary} />
                    <Text style={styles.dateText}>{item.date}</Text>
                  </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                  <Text style={[styles.statusBadgeText, { color: statusStyle.text }]}>{statusStyle.label}</Text>
                </View>
              </View>

              <View style={styles.cardFooter}>
                <View style={styles.footerCol}>
                  <Text style={styles.footerLabel}>Occasion</Text>
                  <Text style={styles.footerValue}>{item.eventType}</Text>
                </View>
                <View style={styles.footerCol}>
                  <Text style={styles.footerLabel}>Guests</Text>
                  <Text style={styles.footerValue}>{item.guestCount}</Text>
                </View>
                <View style={styles.footerCol}>
                  <Text style={styles.footerLabel}>Pricing</Text>
                  <Text style={[styles.footerValue, styles.priceText]}>{item.price}</Text>
                </View>
              </View>
              {item.notes ? (
                <View style={styles.notesBox}>
                  <Text style={styles.notesLabel}>Notes:</Text>
                  <Text style={styles.notesText} numberOfLines={2}>{item.notes}</Text>
                </View>
              ) : null}
            </Card>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.iconWrapper}>
              <MaterialCommunityIcons name="calendar-blank-outline" size={64} color={theme.colors.textSecondary} />
            </View>
            <Text style={styles.emptyTitle}>No Booking Requests Yet</Text>
            <Text style={styles.emptySubtitle}>
              Browse our services in Explore and send booking requests for your upcoming occasion.
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Explore')}
              style={styles.exploreBtn}
              activeOpacity={0.8}
            >
              <Text style={styles.exploreBtnText}>Start Exploring</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.extrabold,
    color: theme.colors.textPrimary,
  },
  subtitle: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  listContent: {
    padding: theme.spacing.lg,
  },
  bookingCard: {
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  vendorImage: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.sm,
  },
  vendorMeta: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  vendorName: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.textPrimary,
  },
  categoryText: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.weights.medium,
    marginTop: 2,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  dateText: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textSecondary,
    marginLeft: 4,
    fontWeight: theme.typography.weights.semibold,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.xs,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: theme.typography.weights.bold,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    marginTop: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  footerCol: {
    alignItems: 'flex-start',
  },
  footerLabel: {
    fontSize: 10,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.weights.semibold,
    textTransform: 'uppercase',
  },
  footerValue: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.weights.bold,
    marginTop: 2,
  },
  priceText: {
    color: theme.colors.primary,
  },
  notesBox: {
    marginTop: theme.spacing.sm,
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  notesLabel: {
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.textPrimary,
  },
  notesText: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
    paddingHorizontal: theme.spacing.xl,
  },
  iconWrapper: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  emptyTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.textPrimary,
  },
  emptySubtitle: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
    lineHeight: 20,
    marginBottom: theme.spacing.lg,
  },
  exploreBtn: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.small,
  },
  exploreBtnText: {
    color: theme.colors.white,
    fontWeight: theme.typography.weights.bold,
    fontSize: theme.typography.sizes.sm,
  },
});
