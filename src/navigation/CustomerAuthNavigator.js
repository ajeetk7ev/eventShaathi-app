import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CustomerWelcomeScreen from '../screens/customer/auth/CustomerWelcomeScreen';
import CustomerLoginScreen from '../screens/customer/auth/CustomerLoginScreen';
import CustomerSignupScreen from '../screens/customer/auth/CustomerSignupScreen';

const Stack = createNativeStackNavigator();

export default function CustomerAuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={CustomerWelcomeScreen} />
      <Stack.Screen name="Login" component={CustomerLoginScreen} />
      <Stack.Screen name="Signup" component={CustomerSignupScreen} />
    </Stack.Navigator>
  );
}
