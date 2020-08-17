export const colors = {
  primary: '#9E9E9E',
  primary_dark: '#616161',
  primary_light: '#F5F5F5',
  accent: '#FFEB3B',
  primary_text: '#212121',
  secondary_text: '#757575',
  icons: '#212121',
  divider: '#BDBDBD',
  background: '#171717',
  green: '#02c39a',
  red: '#d64848',
};

export const darkColorTheme = {
  ...colors,
};

export type DarkColorTheme = typeof darkColorTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends DarkColorTheme {}
}
