// filename: src/components/ThemedText.js
import React from 'react';
import { Text, StyleSheet, Platform } from 'react-native';

export function ThemedText({ type = 'body', style, children, color }) {
  return (
    <Text style={[styles.base, styles[type], { color: color || '#2D3436' }, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: Platform.select({
      ios: 'Avenir Next',
      android: 'sans-serif-medium',
      default: 'System',
    }),
  },
  hero: { fontSize: 40, fontWeight: '700', letterSpacing: -1.5, lineHeight: 48 },
  h1: { fontSize: 32, fontWeight: '700', letterSpacing: -1, lineHeight: 38 },
  h2: { fontSize: 24, fontWeight: '600', letterSpacing: -0.5, lineHeight: 32 },
  h3: { fontSize: 20, fontWeight: '600', lineHeight: 28 },
  h4: { fontSize: 17, fontWeight: '600', lineHeight: 24 },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400' },
  small: { fontSize: 14, lineHeight: 20, fontWeight: '500', opacity: 0.7 },
  caption: { fontSize: 12, fontWeight: '700', letterSpacing: 0.8, textTransform: 'uppercase', opacity: 0.5 },
});