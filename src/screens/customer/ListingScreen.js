import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import { theme } from '../../theme/theme';
import Card from '../../components/Card';
import SearchInput from '../../components/SearchInput';
import { CATEGORIES, FEATURED_VENDORS } from '../../mockData';

const { width } = Dimensions.get('window');

const PRICE_FILTERS = [
  { id: 'all', label: 'All Prices', min: 0, max: Infinity },
  { id: 'budget', label: 'Under ₹30k', min: 0, max: 30000 },
  { id: 'mid', label: '₹30k - ₹80k', min: 30000, max: 80000 },
  { id: 'premium', label: '₹80k+', min: 80000, max: Infinity },
];

export default function ListingScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  
  // Route parameters
  const initialCategory = route.params?.selectedCategory || null;
  const initialQuery = route.params?.query || route.params?.searchWord || '';

  // Local Filter States
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPriceFilter, setSelectedPriceFilter] = useState('all');
  const [onlyHighRated, setOnlyHighRated] = useState(false);

  // Sync route parameters if they change
  useEffect(() => {
    if (route.params?.selectedCategory) {
      setSelectedCategory(route.params.selectedCategory);
    }
    if (route.params?.query) {
      setSearchQuery(route.params.query);
    }
    if (route.params?.searchWord) {
      setSearchQuery(route.params.searchWord);
    }
  }, [route.params]);

  // Handle filter logic
  const filteredListings = FEATURED_VENDORS.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = !selectedCategory || item.category === selectedCategory;

    const activePrice = PRICE_FILTERS.find((f) => f.id === selectedPriceFilter);
    const matchesPrice = item.priceValue >= activePrice.min && item.priceValue <= activePrice.max;

    const matchesRating = !onlyHighRated || item.rating >= 4.8;

    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });

  const getAvailabilityColor = (status) => {
    switch (status) {
      case 'Available Today':
        return theme.colors.success;
      case 'Available Next Week':
        return theme.colors.warning;
      default:
        return theme.colors.textSecondary;
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Top Navbar */}
      <View style={styles.topNavbar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.navbarTitle}>
          {selectedCategory ? `${selectedCategory} Services` : 'All Services'}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Search Input Container */}
      <View style={styles.searchSection}>
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={`Search ${selectedCategory || 'services'}...`}
        />
      </View>

      {/* Category Slider */}
      <View style={styles.sliderContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[{ name: 'All' }, ...CATEGORIES]}
          keyExtractor={(item) => item.id || 'all-chip'}
          contentContainerStyle={styles.sliderList}
          renderItem={({ item }) => {
            const isSelected = (!selectedCategory && item.name === 'All') || selectedCategory === item.name;
            return (
              <TouchableOpacity
                style={[styles.chip, isSelected && styles.activeChip]}
                onPress={() => setSelectedCategory(item.name === 'All' ? null : item.name)}
                activeOpacity={0.8}
              >
                <Text style={[styles.chipText, isSelected && styles.activeChipText]}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Filter Options Bar */}
      <View style={styles.filterOptionsBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.priceFilterScroll}>
          {PRICE_FILTERS.map((f) => (
            <TouchableOpacity
              key={f.id}
              style={[
                styles.priceFilterBtn,
                selectedPriceFilter === f.id && styles.activePriceFilterBtn,
              ]}
              onPress={() => setSelectedPriceFilter(f.id)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.priceFilterText,
                  selectedPriceFilter === f.id && styles.activePriceFilterText,
                ]}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={[styles.priceFilterBtn, onlyHighRated && styles.activePriceFilterBtn]}
            onPress={() => setOnlyHighRated(!onlyHighRated)}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name="star"
              size={14}
              color={onlyHighRated ? theme.colors.white : '#F59E0B'}
              style={{ marginRight: 4 }}
            />
            <Text style={[styles.priceFilterText, onlyHighRated && styles.activePriceFilterText]}>
              4.8+ Rated
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Results Title Count */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCountText}>{filteredListings.length} matching options found</Text>
      </View>

      {/* Main Listing View */}
      <FlatList
        data={filteredListings}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeIn.delay(index * 50).duration(400)}>
            <Card
              style={styles.listingCard}
              elevation="small"
              onPress={() => navigation.navigate('VendorDetails', { vendorId: item.id })}
            >
              <View style={styles.imageWrapper}>
                <Image source={{ uri: item.image }} style={styles.vendorImage} />
                <View style={styles.badgeRow}>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryBadgeText}>{item.category}</Text>
                  </View>
                  <View style={[styles.availabilityBadge, { backgroundColor: getAvailabilityColor(item.availability) }]}>
                    <Text style={styles.availabilityBadgeText}>{item.availability}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.cardDetails}>
                <View style={styles.titleRow}>
                  <Text style={styles.vendorTitle} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <View style={styles.ratingBox}>
                    <MaterialCommunityIcons name="star" size={16} color="#F59E0B" />
                    <Text style={styles.ratingVal}>{item.rating}</Text>
                  </View>
                </View>

                <Text style={styles.descriptionText} numberOfLines={2}>
                  {item.description}
                </Text>

                <View style={styles.locationWrapper}>
                  <MaterialCommunityIcons name="map-marker-outline" size={16} color={theme.colors.textSecondary} />
                  <Text style={styles.locationText} numberOfLines={1}>
                    {item.location}
                  </Text>
                </View>

                <View style={styles.priceRow}>
                  <View style={styles.priceBox}>
                    <Text style={styles.priceLabel}>Starting from</Text>
                    <Text style={styles.priceVal}>{item.price}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.bookBtn}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('VendorDetails', { vendorId: item.id })}
                  >
                    <Text style={styles.bookBtnText}>Book Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          </Animated.View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="filter-remove-outline" size={60} color={theme.colors.textSecondary} />
            <Text style={styles.emptyTitle}>No Results Found</Text>
            <Text style={styles.emptySubtitle}>Try adjusting your filters or search query to find listings.</Text>
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
  topNavbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
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
  searchSection: {
    paddingHorizontal: theme.spacing.lg,
    marginVertical: theme.spacing.xs,
  },
  sliderContainer: {
    marginVertical: theme.spacing.sm,
  },
  sliderList: {
    paddingHorizontal: theme.spacing.lg,
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
  filterOptionsBar: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  priceFilterScroll: {
    paddingRight: theme.spacing.xl,
  },
  priceFilterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.sm,
    marginRight: theme.spacing.xs,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  activePriceFilterBtn: {
    backgroundColor: theme.colors.primaryLight,
    borderColor: theme.colors.primary,
  },
  priceFilterText: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.weights.semibold,
  },
  activePriceFilterText: {
    color: theme.colors.primary,
  },
  resultsHeader: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xs,
  },
  resultsCountText: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.weights.medium,
  },
  listContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  listingCard: {
    marginBottom: theme.spacing.md,
    padding: 0,
    overflow: 'hidden',
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 190,
  },
  vendorImage: {
    width: '100%',
    height: '100%',
  },
  badgeRow: {
    position: 'absolute',
    top: theme.spacing.sm,
    left: theme.spacing.sm,
    right: theme.spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    backgroundColor: 'rgba(17, 24, 27, 0.85)',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.xs,
  },
  categoryBadgeText: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.bold,
  },
  availabilityBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.xs,
  },
  availabilityBadgeText: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.bold,
  },
  cardDetails: {
    padding: theme.spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vendorTitle: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.extrabold,
    color: theme.colors.textPrimary,
    flex: 1,
    marginRight: theme.spacing.xs,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingVal: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.textPrimary,
    marginLeft: 2,
  },
  descriptionText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    lineHeight: 18,
    marginVertical: theme.spacing.xs,
  },
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
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
  priceBox: {
    justifyContent: 'center',
  },
  priceLabel: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textSecondary,
  },
  priceVal: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.extrabold,
    color: theme.colors.primary,
    marginTop: 2,
  },
  bookBtn: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
  },
  bookBtnText: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.bold,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: theme.spacing.xl,
  },
  emptyTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.md,
  },
  emptySubtitle: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
    lineHeight: 20,
  },
});
