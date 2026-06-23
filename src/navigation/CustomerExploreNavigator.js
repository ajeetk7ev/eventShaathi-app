import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CustomerHomeScreen from '../screens/customer/CustomerHomeScreen';
import ListingScreen from '../screens/customer/ListingScreen';
import VendorDetailsScreen from '../screens/customer/VendorDetailsScreen';

const Stack = createNativeStackNavigator();

export default function CustomerExploreNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CustomerHome" component={CustomerHomeScreen} />
      <Stack.Screen name="Listing" component={ListingScreen} />
      <Stack.Screen name="VendorDetails" component={VendorDetailsScreen} />
    </Stack.Navigator>
  );
}
