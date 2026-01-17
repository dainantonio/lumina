// filename: src/components/BalanceCard.js
import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { ThemedText } from './ThemedText';
import { LucideWallet, LucidePiggyBank, LucideTrendingUp, LucideHeart } from 'lucide-react-native';

const ICONS = {
  spend: { icon: LucideWallet, color: '#FF7675', label: 'Spend' },
  save: { icon: LucidePiggyBank, color: '#4ECDC4', label: 'Save' },
  grow: { icon: LucideTrendingUp, color: '#FFE66D', label: 'Grow' },
  give: { icon: LucideHeart, color: '#FF9F43', label: 'Give' },
};

export function BalanceCard({ type, amount }) {
  const config = ICONS[type];
  const Icon = config.icon;
  
  // Slide In Animation
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true })
    ]).start();
  }, []);

  return (
    <Animated.View style={[
      styles.container, 
      { 
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
        borderTopColor: config.color 
      }
    ]}>
      <View style={[styles.iconBox, { backgroundColor: config.color + '20' }]}>
        <Icon size={20} color={config.color} />
      </View>
      <View>
        <ThemedText type="small" style={{marginBottom: 4}}>{config.label}</ThemedText>
        <ThemedText type="h3">${amount.toFixed(0)}</ThemedText>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 20,
    borderTopWidth: 4,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    minHeight: 120,
    justifyContent: 'space-between'
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start'
  }
});