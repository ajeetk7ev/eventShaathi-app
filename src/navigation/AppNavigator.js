import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useUserStore } from '../store/userStore';

import RoleSelectionScreen from '../screens/RoleSelectionScreen';
import CustomerAuthNavigator from './CustomerAuthNavigator';
import CustomerTabNavigator from './CustomerTabNavigator';
import VendorNavigator from './VendorNavigator';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const role = useUserStore((state) => state.role);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {role === null ? (
          <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
        ) : role === 'customer' ? (
          // If customer role is active, check if authenticated
          isAuthenticated ? (
            <Stack.Screen name="CustomerFlow" component={CustomerTabNavigator} />
          ) : (
            <Stack.Screen name="CustomerAuth" component={CustomerAuthNavigator} />
          )
        ) : (
          // Vendor currently loads directly, but can easily be extended
          <Stack.Screen name="VendorFlow" component={VendorNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
