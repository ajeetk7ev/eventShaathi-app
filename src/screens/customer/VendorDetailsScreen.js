import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../theme/theme';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { FEATURED_VENDORS } from '../../mockData';

const { width } = Dimensions.get('window');

const CALENDAR_DAYS = Array.from({ length: 30 }, (_, i) => {
  const dayNum = i + 1;
  const dateStr = `2026-06-${dayNum < 10 ? '0' + dayNum : dayNum}`;
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dayName = daysOfWeek[i % 7];
  return { dateStr, dayNum, dayName };
});

export default function VendorDetailsScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { vendorId } = route.params;

  const vendor = FEATURED_VENDORS.find((v) => v.id === vendorId) || FEATURED_VENDORS[0];
  const [selectedDate, setSelectedDate] = useState(null);

  const handleBookingRequest = () => {
    if (!selectedDate) {
      alert('Please select a booking date from the availability calendar.');
      return;
    }
    navigation.navigate('BookingForm', {
      vendorId: vendor.id,
      selectedDate: selectedDate,
    });
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Gallery Image Banner & Back Button */}
        <View style={styles.imageGalleryContainer}>
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
            {vendor.gallery.map((imgUrl, index) => (
              <Image key={index} source={{ uri: imgUrl }} style={styles.galleryImage} />
            ))}
          </ScrollView>
          <TouchableOpacity
            style={[styles.backBtn, { top: insets.top || theme.spacing.sm }]}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Info Header */}
        <View style={styles.detailContainer}>
          <View style={styles.titleRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>{vendor.category}</Text>
            </View>
            <View style={styles.ratingRow}>
              <MaterialCommunityIcons name="star" size={18} color="#F59E0B" />
              <Text style={styles.ratingVal}>{vendor.rating}</Text>
              <Text style={styles.reviewsCount}>({vendor.reviewsCount} reviews)</Text>
            </View>
          </View>

          <Text style={styles.vendorName}>{vendor.name}</Text>

          <View style={styles.locationWrapper}>
            <MaterialCommunityIcons name="map-marker" size={16} color={theme.colors.primary} />
            <Text style={styles.locationText}>{vendor.location}</Text>
          </View>

          <View style={styles.divider} />

          {/* Description */}
          <Text style={styles.sectionTitle}>About Service</Text>
          <Text style={styles.descriptionText}>{vendor.description}</Text>

          <View style={styles.divider} />

          {/* Services Included */}
          <Text style={styles.sectionTitle}>What's Included</Text>
          <View style={styles.servicesGrid}>
            {vendor.servicesIncluded.map((service, index) => (
              <View key={index} style={styles.serviceItem}>
                <MaterialCommunityIcons name="check-circle" size={18} color={theme.colors.success} style={styles.checkIcon} />
                <Text style={styles.serviceText}>{service}</Text>
              </View>
            ))}
          </View>

          <View style={styles.divider} />

          {/* Interactive Availability Calendar */}
          <Text style={styles.sectionTitle}>Availability Calendar</Text>
          <Text style={styles.sectionSubtitle}>June 2026</Text>
          <View style={styles.calendarContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.calendarScroll}>
              {CALENDAR_DAYS.map((day) => {
                const isBlocked = vendor.blockedDates.includes(day.dateStr);
                const isSelected = selectedDate === day.dateStr;

                return (
                  <TouchableOpacity
                    key={day.dateStr}
                    disabled={isBlocked}
                    onPress={() => setSelectedDate(isSelected ? null : day.dateStr)}
                    activeOpacity={0.8}
                    style={[
                      styles.calendarDayCard,
                      isBlocked && styles.blockedDayCard,
                      isSelected && styles.selectedDayCard,
                    ]}
                  >
                    <Text style={[styles.dayName, isSelected && styles.selectedText, isBlocked && styles.blockedText]}>
                      {day.dayName}
                    </Text>
                    <Text style={[styles.dayNumber, isSelected && styles.selectedText, isBlocked && styles.blockedText]}>
                      {day.dayNum}
                    </Text>
                    <Text style={[styles.statusText, isSelected && styles.selectedStatusText, isBlocked && styles.blockedStatusText]}>
                      {isBlocked ? 'Booked' : 'Available'}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          <View style={styles.divider} />

          {/* Reviews Section */}
          <Text style={styles.sectionTitle}>Client Reviews</Text>
          {vendor.reviews.map((rev) => (
            <Card key={rev.id} style={styles.reviewCard} elevation="small">
              <View style={styles.reviewHeader}>
                <Image source={{ uri: rev.avatar }} style={styles.reviewAvatar} />
                <View style={styles.reviewUserMeta}>
                  <Text style={styles.reviewUserName}>{rev.userName}</Text>
                  <Text style={styles.reviewDate}>{rev.date}</Text>
                </View>
                <View style={styles.reviewStars}>
                  <MaterialCommunityIcons name="star" size={16} color="#F59E0B" />
                  <Text style={styles.reviewRatingVal}>{rev.rating}</Text>
                </View>
              </View>
              <Text style={styles.reviewComment}>{rev.comment}</Text>
            </Card>
          ))}
        </View>
      </ScrollView>

      {/* Sticky Bottom Pricing & CTA */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomPriceBox}>
          <Text style={styles.bottomPriceLabel}>Total Pricing</Text>
          <Text style={styles.bottomPriceVal}>{vendor.price}</Text>
        </View>
        <Button
          title="Send Booking Request"
          variant="primary"
          icon="calendar-check"
          onPress={handleBookingRequest}
          style={styles.ctaButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageGalleryContainer: {
    position: 'relative',
    width: '100%',
    height: 250,
  },
  galleryImage: {
    width: width,
    height: 250,
  },
  backBtn: {
    position: 'absolute',
    left: theme.spacing.lg,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.small,
  },
  detailContainer: {
    padding: theme.spacing.lg,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  categoryBadge: {
    backgroundColor: theme.colors.primaryLight,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.xs,
  },
  categoryBadgeText: {
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.bold,
    fontSize: theme.typography.sizes.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingVal: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.textPrimary,
    marginLeft: 4,
  },
  reviewsCount: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textSecondary,
    marginLeft: 4,
  },
  vendorName: {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: theme.typography.weights.extrabold,
    color: theme.colors.textPrimary,
    marginVertical: 4,
  },
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  locationText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  sectionSubtitle: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.weights.semibold,
    marginBottom: theme.spacing.sm,
  },
  descriptionText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    lineHeight: 22,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: theme.spacing.sm,
  },
  checkIcon: {
    marginRight: 6,
  },
  serviceText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textPrimary,
    flex: 1,
  },
  calendarContainer: {
    marginHorizontal: -theme.spacing.lg,
  },
  calendarScroll: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: 4,
  },
  calendarDayCard: {
    width: 68,
    height: 80,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.xs,
  },
  blockedDayCard: {
    backgroundColor: theme.colors.gray[100],
    borderColor: theme.colors.gray[200],
  },
  selectedDayCard: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  dayName: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.weights.medium,
  },
  dayNumber: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.textPrimary,
    marginVertical: 2,
  },
  statusText: {
    fontSize: 9,
    color: theme.colors.success,
    fontWeight: theme.typography.weights.bold,
  },
  selectedText: {
    color: theme.colors.white,
  },
  blockedText: {
    color: theme.colors.gray[400],
  },
  selectedStatusText: {
    color: theme.colors.white,
  },
  blockedStatusText: {
    color: theme.colors.gray[400],
  },
  reviewCard: {
    marginBottom: theme.spacing.sm,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  reviewAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  reviewUserMeta: {
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
  reviewUserName: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.textPrimary,
  },
  reviewDate: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  reviewStars: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.xs,
  },
  reviewRatingVal: {
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.textPrimary,
    marginLeft: 2,
  },
  reviewComment: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...theme.shadows.medium,
  },
  bottomPriceBox: {
    justifyContent: 'center',
  },
  bottomPriceLabel: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textSecondary,
  },
  bottomPriceVal: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.extrabold,
    color: theme.colors.primary,
    marginTop: 2,
  },
  ctaButton: {
    flex: 1,
    marginLeft: theme.spacing.lg,
  },
});
