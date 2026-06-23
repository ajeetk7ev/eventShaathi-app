import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { theme } from '../../theme/theme';
import { useUserStore } from '../../store/userStore';
import SearchInput from '../../components/SearchInput';
import Card from '../../components/Card';
import { EVENT_TYPES, CATEGORIES, FEATURED_VENDORS } from '../../mockData';

const { width } = Dimensions.get('window');

export default function CustomerHomeScreen() {
  const insets = useSafeAreaInsets();
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventType, setSelectedEventType] = useState(null);

  // Filter vendors based on category/search if desired
  const filteredVendors = FEATURED_VENDORS.filter((vendor) => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Fixed Top Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greetingText}>Hello,</Text>
          <Text style={styles.userName}>{user?.name || 'Guest User'}</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.notificationBtn} activeOpacity={0.8}>
            <MaterialCommunityIcons name="bell-outline" size={24} color={theme.colors.textPrimary} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
          <TouchableOpacity onPress={logout} activeOpacity={0.8}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop' }}
              style={styles.profileAvatar}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Search Bar Section */}
        <Animated.View entering={FadeInUp.delay(100).duration(600)} style={styles.searchSection}>
          <SearchInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search DJ, Venue, Photographer..."
            onFilterPress={() => {}}
          />
        </Animated.View>

        {/* Event Types Horizontal Scroll */}
        <Animated.View entering={FadeInUp.delay(200).duration(600)} style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>What's the Occasion?</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.eventTypesList}
          >
            {EVENT_TYPES.map((item) => {
              const isSelected = selectedEventType === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.eventTypeCard,
                    isSelected && { backgroundColor: theme.colors.primaryLight, borderColor: theme.colors.primary },
                  ]}
                  onPress={() => setSelectedEventType(isSelected ? null : item.id)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.eventTypeIconWrapper, { backgroundColor: item.color + '15' }]}>
                    <MaterialCommunityIcons name={item.icon} size={22} color={item.color} />
                  </View>
                  <Text style={[styles.eventTypeName, isSelected && { color: theme.colors.primary, fontWeight: '700' }]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </Animated.View>

        {/* Categories Grid (2 rows of 4 columns) */}
        <Animated.View entering={FadeInUp.delay(300).duration(600)} style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Browse Categories</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.gridContainer}>
            {CATEGORIES.map((item) => (
              <TouchableOpacity key={item.id} style={styles.gridItem} activeOpacity={0.7}>
                <View style={[styles.gridIconWrapper, { backgroundColor: item.color + '10' }]}>
                  <MaterialCommunityIcons name={item.icon} size={24} color={item.color} />
                </View>
                <Text style={styles.gridItemName} numberOfLines={1}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Featured Vendors list */}
        <Animated.View entering={FadeInDown.delay(400).duration(600)} style={[styles.sectionContainer, styles.vendorsSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Services</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View Map</Text>
            </TouchableOpacity>
          </View>

          {filteredVendors.length === 0 ? (
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons name="alert-circle-outline" size={48} color={theme.colors.textSecondary} />
              <Text style={styles.emptyText}>No vendors match your search</Text>
            </View>
          ) : (
            filteredVendors.map((item) => (
              <Card key={item.id} style={styles.vendorCard} elevation="small">
                <Image source={{ uri: item.image }} style={styles.vendorImage} />
                <View style={styles.tagContainer}>
                  <Text style={styles.tagText}>{item.category}</Text>
                </View>
                <View style={styles.vendorDetails}>
                  <View style={styles.vendorHeaderRow}>
                    <Text style={styles.vendorName} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <View style={styles.ratingWrapper}>
                      <MaterialCommunityIcons name="star" size={16} color="#F59E0B" />
                      <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                  </View>
                  <View style={styles.locationWrapper}>
                    <MaterialCommunityIcons name="map-marker-outline" size={16} color={theme.colors.textSecondary} />
                    <Text style={styles.locationText} numberOfLines={1}>
                      {item.location}
                    </Text>
                  </View>
                  <View style={styles.priceRow}>
                    <Text style={styles.priceText}>{item.price}</Text>
                    <Text style={styles.reviewsCount}>({item.reviewsCount} reviews)</Text>
                  </View>
                </View>
              </Card>
            ))
          )}
        </Animated.View>
      </ScrollView>
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
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.background,
  },
  greetingText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.weights.medium,
  },
  userName: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.extrabold,
    color: theme.colors.textPrimary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationBtn: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.error,
  },
  profileAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },
  searchSection: {
    paddingHorizontal: theme.spacing.lg,
    marginVertical: theme.spacing.md,
  },
  sectionContainer: {
    marginTop: theme.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  sectionTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.textPrimary,
    paddingHorizontal: theme.spacing.lg,
  },
  seeAllText: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.primary,
  },
  eventTypesList: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xs,
  },
  eventTypeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    marginRight: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  eventTypeIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.xs,
  },
  eventTypeName: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.textPrimary,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.spacing.md,
    justifyContent: 'space-between',
    marginTop: theme.spacing.xs,
  },
  gridItem: {
    width: (width - 48) / 4,
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  gridIconWrapper: {
    width: 52,
    height: 52,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xs,
    ...theme.shadows.small,
  },
  gridItemName: {
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.textPrimary,
    textAlign: 'center',
  },
  vendorsSection: {
    paddingHorizontal: theme.spacing.lg,
  },
  vendorCard: {
    marginBottom: theme.spacing.md,
    padding: 0,
    overflow: 'hidden',
  },
  vendorImage: {
    width: '100%',
    height: 180,
  },
  tagContainer: {
    position: 'absolute',
    top: theme.spacing.sm,
    left: theme.spacing.sm,
    backgroundColor: 'rgba(17, 24, 27, 0.75)',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.xs,
  },
  tagText: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.semibold,
  },
  vendorDetails: {
    padding: theme.spacing.md,
  },
  vendorHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vendorName: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.textPrimary,
    flex: 1,
    marginRight: theme.spacing.xs,
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.textPrimary,
    marginLeft: 2,
  },
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    marginLeft: 2,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  priceText: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.primary,
  },
  reviewsCount: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textSecondary,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  emptyText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.sm,
    marginTop: theme.spacing.xs,
  },
});
