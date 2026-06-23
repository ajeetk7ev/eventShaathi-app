import { Platform } from 'react-native';

export const typography = {
  fontFamily: {
    regular: Platform.select({ ios: 'System', android: 'sans-serif' }),
    medium: Platform.select({ ios: 'System', android: 'sans-serif-medium' }),
    bold: Platform.select({ ios: 'System', android: 'sans-serif-condensed-bold' }),
  },
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  lineHeights: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    xxl: 36,
  },
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  }
};
