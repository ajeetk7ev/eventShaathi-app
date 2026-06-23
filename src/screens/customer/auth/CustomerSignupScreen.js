import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { theme } from '../../../theme/theme';
import Button from '../../../components/Button';
import { useUserStore } from '../../../store/userStore';

export default function CustomerSignupScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const login = useUserStore((state) => state.login);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Error States
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSignup = () => {
    let isValid = true;
    setNameError('');
    setEmailError('');
    setPhoneError('');
    setPasswordError('');

    if (!name.trim()) {
      setNameError('Full name is required');
      isValid = false;
    }

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    if (!phone) {
      setPhoneError('Phone number is required');
      isValid = false;
    } else if (phone.length < 10) {
      setPhoneError('Please enter a valid 10-digit phone number');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    if (isValid) {
      // Perform static login with new user info
      login('customer', { email, name });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Navigation */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Intro */}
        <Animated.View entering={FadeInUp.delay(100).duration(600)} style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join EventSaathi and start planning your next big event</Text>
        </Animated.View>

        {/* Form Fields */}
        <Animated.View entering={FadeInUp.delay(200).duration(600)} style={styles.form}>
          {/* Full Name Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <View style={[styles.inputWrapper, nameError ? styles.inputErrorBorder : null]}>
              <MaterialCommunityIcons
                name="account-outline"
                size={20}
                color={theme.colors.textSecondary}
                style={styles.fieldIcon}
              />
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="John Doe"
                placeholderTextColor={theme.colors.textSecondary}
                style={styles.input}
              />
            </View>
            {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
          </View>

          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <View style={[styles.inputWrapper, emailError ? styles.inputErrorBorder : null]}>
              <MaterialCommunityIcons
                name="email-outline"
                size={20}
                color={theme.colors.textSecondary}
                style={styles.fieldIcon}
              />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="name@example.com"
                placeholderTextColor={theme.colors.textSecondary}
                autoCapitalize="none"
                keyboardType="email-address"
                style={styles.input}
              />
            </View>
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          </View>

          {/* Phone Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={[styles.inputWrapper, phoneError ? styles.inputErrorBorder : null]}>
              <MaterialCommunityIcons
                name="phone-outline"
                size={20}
                color={theme.colors.textSecondary}
                style={styles.fieldIcon}
              />
              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="10-digit number"
                placeholderTextColor={theme.colors.textSecondary}
                keyboardType="phone-pad"
                style={styles.input}
              />
            </View>
            {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={[styles.inputWrapper, passwordError ? styles.inputErrorBorder : null]}>
              <MaterialCommunityIcons
                name="lock-outline"
                size={20}
                color={theme.colors.textSecondary}
                style={styles.fieldIcon}
              />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Min. 6 characters"
                placeholderTextColor={theme.colors.textSecondary}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                style={styles.input}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                <MaterialCommunityIcons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={theme.colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          </View>

          {/* Submit */}
          <Button
            title="Create Account"
            variant="primary"
            onPress={handleSignup}
            style={styles.submitBtn}
          />
        </Animated.View>

        {/* Footer */}
        <Animated.View entering={FadeInUp.delay(300).duration(600)} style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')} activeOpacity={0.8}>
            <Text style={styles.linkText}>Log In</Text>
          </TouchableOpacity>
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
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.lg,
    justifyContent: 'space-between',
  },
  topBar: {
    height: 48,
    justifyContent: 'center',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  header: {
    marginTop: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: theme.typography.weights.extrabold,
    color: theme.colors.textPrimary,
  },
  subtitle: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
    lineHeight: 22,
  },
  form: {
    marginTop: theme.spacing.xl,
    flex: 1,
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
  eyeBtn: {
    padding: theme.spacing.xs,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.typography.sizes.xs,
    marginTop: theme.spacing.xs,
  },
  submitBtn: {
    width: '100%',
    marginTop: theme.spacing.lg,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  footerText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.sm,
  },
  linkText: {
    color: theme.colors.primary,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.bold,
  },
});
