import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../theme/theme';

import CustomerHomeScreen from '../screens/customer/CustomerHomeScreen';
import CustomerBookingsScreen from '../screens/customer/CustomerBookingsScreen';
import CustomerProfileScreen from '../screens/customer/CustomerProfileScreen';

const Tab = createBottomTabNavigator();

export default function CustomerTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
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

          if (route.name === 'Explore') {
            iconName = 'magnify';
          } else if (route.name === 'Bookings') {
            iconName = 'calendar-clock';
          } else if (route.name === 'Profile') {
            iconName = 'account-outline';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Explore" component={CustomerHomeScreen} />
      <Tab.Screen name="Bookings" component={CustomerBookingsScreen} />
      <Tab.Screen name="Profile" component={CustomerProfileScreen} />
    </Tab.Navigator>
  );
}
