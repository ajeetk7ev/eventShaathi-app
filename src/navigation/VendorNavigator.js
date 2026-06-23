import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../theme/theme';

import VendorDashboardScreen from '../screens/vendor/VendorDashboardScreen';
import VendorBookingsScreen from '../screens/vendor/VendorBookingsScreen';
import VendorProfileScreen from '../screens/vendor/VendorProfileScreen';

const Tab = createBottomTabNavigator();

export default function VendorNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#0284C7', // Vendor signature color
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.white,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: theme.spacing.xs,
          paddingTop: theme.spacing.xs,
        },
        tabBarLabelStyle: {
          fontSize: theme.typography.sizes.xs,
          fontWeight: theme.typography.weights.medium,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = 'view-dashboard-outline';
          } else if (route.name === 'Bookings') {
            iconName = 'calendar-check-outline';
          } else if (route.name === 'Profile') {
            iconName = 'storefront-outline';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={VendorDashboardScreen} />
      <Tab.Screen name="Bookings" component={VendorBookingsScreen} />
      <Tab.Screen name="Profile" component={VendorProfileScreen} />
    </Tab.Navigator>
  );
}
