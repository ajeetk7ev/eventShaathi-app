import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { theme } from '../../theme/theme';
import { useUserStore } from '../../store/userStore';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { FEATURED_VENDORS, EVENT_TYPES } from '../../mockData';

export default function BookingFormScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { vendorId, selectedDate } = route.params;

  const vendor = FEATURED_VENDORS.find((v) => v.id === vendorId) || FEATURED_VENDORS[0];
  const addBooking = useUserStore((state) => state.addBooking);

  // Form States
  const [selectedEventType, setSelectedEventType] = useState(EVENT_TYPES[0].name);
  const [guestCount, setGuestCount] = useState('');
  const [notes, setNotes] = useState('');

  // Error States
  const [guestError, setGuestError] = useState('');

  const handleSubmit = () => {
    setGuestError('');
    if (!guestCount || parseInt(guestCount, 10) <= 0) {
      setGuestError('Please enter a valid guest count');
      return;
    }

    // Create a new booking object
    const bookingId = `ES-BK-${Date.now().toString().slice(-6)}`;
    const newBooking = {
      id: bookingId,
      vendorId: vendor.id,
      vendorName: vendor.name,
      vendorCategory: vendor.category,
      vendorImage: vendor.image,
      date: selectedDate,
      eventType: selectedEventType,
      guestCount: parseInt(guestCount, 10),
      notes: notes,
      status: 'pending',
      price: vendor.price,
      createdDate: new Date().toLocaleDateString(),
    };

    // Store in Zustand
    addBooking(newBooking);

    // Navigate to Success
    navigation.navigate('BookingSuccess', {
      bookingId,
      vendorName: vendor.name,
      selectedDate,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Top Navbar */}
      <View style={[styles.topNavbar, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.navbarTitle}>Booking Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Vendor Summary Card */}
        <Animated.View entering={FadeInUp.delay(100).duration(600)}>
          <Card style={styles.summaryCard} elevation="small">
            <Text style={styles.summaryLabel}>Selected Service</Text>
            <Text style={styles.vendorName}>{vendor.name}</Text>
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <MaterialCommunityIcons name="calendar" size={16} color={theme.colors.primary} />
                <Text style={styles.metaText}>{selectedDate}</Text>
              </View>
              <View style={styles.metaItem}>
                <MaterialCommunityIcons name="tag-outline" size={16} color={theme.colors.primary} />
                <Text style={styles.metaText}>{vendor.category}</Text>
              </View>
            </View>
          </Card>
        </Animated.View>

        {/* Form Fields */}
        <Animated.View entering={FadeInUp.delay(200).duration(600)} style={styles.formContainer}>
          {/* Event Type */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Select Event Type</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsScroll}>
              {EVENT_TYPES.map((type) => {
                const isSelected = selectedEventType === type.name;
                return (
                  <TouchableOpacity
                    key={type.id}
                    onPress={() => setSelectedEventType(type.name)}
                    style={[styles.chip, isSelected && styles.activeChip]}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.chipText, isSelected && styles.activeChipText]}>{type.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Guest Count */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Approximate Guests</Text>
            <View style={[styles.inputWrapper, guestError ? styles.inputErrorBorder : null]}>
              <MaterialCommunityIcons
                name="account-group-outline"
                size={20}
                color={theme.colors.textSecondary}
                style={styles.fieldIcon}
              />
              <TextInput
                value={guestCount}
                onChangeText={setGuestCount}
                placeholder="e.g. 250"
                placeholderTextColor={theme.colors.textSecondary}
                keyboardType="numeric"
                style={styles.input}
              />
            </View>
            {guestError ? <Text style={styles.errorText}>{guestError}</Text> : null}
          </View>

          {/* Special Notes */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Special Instructions / Notes</Text>
            <View style={[styles.inputWrapper, styles.multilineWrapper]}>
              <TextInput
                value={notes}
                onChangeText={setNotes}
                placeholder="Share any theme requirements, special requests, or preferences..."
                placeholderTextColor={theme.colors.textSecondary}
                multiline
                numberOfLines={4}
                style={[styles.input, styles.multilineInput]}
              />
            </View>
          </View>

          {/* Billing Breakdown */}
          <Card style={styles.priceBreakdownCard} elevation="small">
            <Text style={styles.priceTitle}>Billing Breakdown</Text>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabelText}>Base Pricing ({vendor.category} hire):</Text>
              <Text style={styles.priceValueText}>{vendor.price}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabelText}>Service & Support Fee:</Text>
              <Text style={styles.priceValueText}>₹999</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.priceRow}>
              <Text style={[styles.priceLabelText, styles.totalText]}>Estimated Total:</Text>
              <Text style={[styles.priceValueText, styles.totalValText]}>
                {vendor.price === '₹1,500/plate'
                  ? `₹${(1500 * (parseInt(guestCount, 10) || 0) + 999).toLocaleString()}`
                  : `${vendor.price} + ₹999`}
              </Text>
            </View>
          </Card>

          <Button
            title="Submit Booking Request"
            variant="primary"
            icon="check-bold"
            onPress={handleSubmit}
            style={styles.submitBtn}
          />
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  topNavbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navbarTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.textPrimary,
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
  summaryCard: {
    backgroundColor: theme.colors.surface,
  },
  summaryLabel: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    fontWeight: theme.typography.weights.bold,
  },
  vendorName: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.extrabold,
    color: theme.colors.textPrimary,
    marginVertical: 4,
  },
  metaRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  metaText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    marginLeft: 4,
    fontWeight: theme.typography.weights.semibold,
  },
  formContainer: {
    marginTop: theme.spacing.lg,
  },
  inputGroup: {
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  chipsScroll: {
    paddingVertical: 4,
  },
  chip: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.round,
    marginRight: theme.spacing.xs,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  activeChip: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  chipText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.weights.semibold,
  },
  activeChipText: {
    color: theme.colors.white,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    height: 48,
    paddingHorizontal: theme.spacing.sm,
  },
  inputErrorBorder: {
    borderColor: theme.colors.error,
  },
  fieldIcon: {
    marginRight: theme.spacing.xs,
  },
  input: {
    flex: 1,
    height: '100%',
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.md,
  },
  multilineWrapper: {
    height: 100,
    alignItems: 'flex-start',
    paddingVertical: theme.spacing.xs,
  },
  multilineInput: {
    textAlignVertical: 'top',
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.typography.sizes.xs,
    marginTop: theme.spacing.xs,
  },
  priceBreakdownCard: {
    marginVertical: theme.spacing.md,
  },
  priceTitle: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  priceLabelText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
  },
  priceValueText: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.sm,
  },
  totalText: {
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.textPrimary,
  },
  totalValText: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.extrabold,
    color: theme.colors.primary,
  },
  submitBtn: {
    width: '100%',
    marginVertical: theme.spacing.md,
  },
});
