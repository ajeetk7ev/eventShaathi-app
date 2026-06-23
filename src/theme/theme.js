import { colors } from './colors';
import { typography } from './typography';

export const theme = {
  colors,
  typography,
  spacing: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    round: 9999,
  },
  shadows: {
    small: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 4,
    },
    large: {
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 24,
      elevation: 8,
    },
  },
};
export default theme;
