import {isDarkMode} from '@app/theme';

export const lightModeColors = {
  primary: '#42C873',
  primaryDark: '#1D6E3B',
  secondary: '#EFA662',
  black: '#101010',
  white: '#FFFFFF',
  accent: '#FF8787',
  yellow: '#EFCA62',
  lightGray: '#EEEEEE',
  gray: '#868686',
  blue: '#0081FB',
  transparent: 'transparent',
  gradientColor2: '#AEED6F',
  light: 'light',
  dark: 'dark',
};

export const darkModeColors = {
  primary: '#1D6E3B',
  primaryDark: '#1D6E3B',
  secondary: '#EFA662',
  black: '#e6e6e6',
  white: '#101010',
  accent: '#FF8787',
  yellow: '#EFCA62',
  lightGray: '#3d3d3d',
  gray: '#868686',
  blue: '#0081FB',
  transparent: 'transparent',
  gradientColor2: '#7aa64e',
  light: 'dark',
  dark: 'light',
};

let COLOR = isDarkMode.current ? darkModeColors : lightModeColors;

export default COLOR;
