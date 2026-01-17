import React, { useState, useContext, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Animated } from 'react-native';
import { MoneyContext } from '../context/MoneyContext';
import { LucideWallet, LucidePiggyBank, LucideTrendingUp, LucideHeart, LucideSparkles, LucidePlus } from 'lucide-react-native';
import { getAvatar } from '../utils/avatars';
import { ThemedText } from '../components/ThemedText';

const AllocationRow = ({ title, amount, color, icon, onPress, theme }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, { toValue: 0.96, duration: 50, useNativeDriver: true }),
      Animated.timing(scaleValue, { toValue: 1, duration: 50, useNativeDriver: true }),
    ]).start();
    onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.9} style={{marginBottom: 12}}>
      <Animated.View style={[
        styles.rowCard, 
        { 
          backgroundColor: theme.cardBg,
          borderLeftColor: color,
          transform: [{ scale: scaleValue }]
        }
      ]}>
        <View style={styles.rowLeft}>
          <View style={[styles.iconCircle, { backgroundColor: color + '20' }]}>
            {icon}
          </View>
          <View>
            <ThemedText type="h4" color={theme.text}>{title}</ThemedText>
            <ThemedText type="small" color={theme.text}>Tap to add $1</ThemedText>
          </View>
        </View>

        <View style={styles.rowRight}>
          <ThemedText type="h3" color={theme.text}>+${amount}</ThemedText>
          <View style={[styles.addBtn, { backgroundColor: color }]}>
            <LucidePlus size={16} color="white" />
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default function Payday({ navigation }) {
  const { addIncome, userProfile, theme } = useContext(MoneyContext);
  
  const TOTAL_PAY = 20;
  const [unallocated, setUnallocated] = useState(TOTAL_PAY);
  const [allocations, setAllocations] = useState({ spend: 0, save: 0, grow: 0, give: 0 });

  const avatar = getAvatar(userProfile?.avatarId);

  const distribute = (category, amount) => {
    if (unallocated - amount < 0) return;
    setUnallocated(prev => prev - amount);
    setAllocations(prev => ({ ...prev, [category]: prev[category] + amount }));
  };

  const handleQuickFill = () => {
    setUnallocated(0);
    setAllocations({ spend: 5, save: 5, grow: 5, give: 5 });
  };

  const handleFinish = () => {
    if (unallocated > 0) {
      alert(`You still have $${unallocated} to sort!`);
      return;
    }
    addIncome(allocations);
    alert("🎉 Money Deposited!");
    setUnallocated(TOTAL_PAY);
    setAllocations({ spend: 0, save: 0, grow: 0, give: 0 });
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.avatarCircle, { backgroundColor: avatar.bg }]}>
             <ThemedText style={{fontSize: 28}}>{avatar.emoji}</ThemedText>
          </View>
          <View>
            <ThemedText type="h1" color={theme.text}>Payday</ThemedText>
            <ThemedText type="body" color={theme.text} style={{opacity: 0.6}}>You earned ${TOTAL_PAY}</ThemedText>
          </View>
        </View>

        {/* Counter */}
        <View style={[styles.counterBox, { backgroundColor: theme.cardBg }]}>
          <ThemedText type="caption" style={{color: '#B2BEC3'}}>LEFT TO SORT</ThemedText>
          <ThemedText type="hero" color={theme.primary}>${unallocated}</ThemedText>
          <View style={[styles.progressBarBg, { backgroundColor: theme.bg }]}>
            <View style={[styles.progressBarFill, { backgroundColor: theme.primary, width: `${(unallocated / TOTAL_PAY) * 100}%` }]} />
          </View>
        </View>

        {/* Allocation List */}
        <View style={styles.listContainer}>
          <AllocationRow title="Spend" amount={allocations.spend} color={theme.jarColors[0]} theme={theme}
            icon={<LucideWallet color={theme.jarColors[0]} size={20}/>} onPress={() => distribute('spend', 1)} />
          <AllocationRow title="Save" amount={allocations.save} color={theme.jarColors[1]} theme={theme}
            icon={<LucidePiggyBank color={theme.jarColors[1]} size={20}/>} onPress={() => distribute('save', 1)} />
          <AllocationRow title="Grow" amount={allocations.grow} color={theme.jarColors[2]} theme={theme}
            icon={<LucideTrendingUp color={theme.jarColors[2]} size={20}/>} onPress={() => distribute('grow', 1)} />
          <AllocationRow title="Give" amount={allocations.give} color={theme.jarColors[3]} theme={theme}
            icon={<LucideHeart color={theme.jarColors[3]} size={20}/>} onPress={() => distribute('give', 1)} />
        </View>

        {/* Actions */}
        <View style={styles.footer}>
          {unallocated > 0 && (
            <TouchableOpacity style={[styles.quickFillBtn, { backgroundColor: theme.primary + '15' }]} onPress={handleQuickFill}>
              <LucideSparkles color={theme.primary} size={18} />
              <ThemedText type="h4" color={theme.primary}>Quick Split Evenly</ThemedText>
            </TouchableOpacity>
          )}

          <TouchableOpacity 
            style={[styles.finishBtn, { backgroundColor: unallocated === 0 ? theme.primary : theme.cardBg }]} 
            onPress={handleFinish}
            disabled={unallocated > 0}
          >
            <ThemedText type="h4" color={unallocated === 0 ? 'white' : '#B2BEC3'}>
              {unallocated === 0 ? "Deposit Money" : "Sort the rest..."}
            </ThemedText>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  avatarCircle: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  counterBox: { borderRadius: 24, padding: 24, alignItems: 'center', marginBottom: 24, shadowColor: '#000', shadowOffset: {width:0, height:4}, shadowOpacity: 0.05, elevation: 2 },
  progressBarBg: { width: '100%', height: 6, borderRadius: 3, marginTop: 16, overflow: 'hidden' },
  progressBarFill: { height: '100%' },
  listContainer: { marginBottom: 20 },
  rowCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderRadius: 20, borderLeftWidth: 4, elevation: 1 },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  iconCircle: { width: 44, height: 44, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  rowRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  addBtn: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  footer: { gap: 12 },
  quickFillBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 16, borderRadius: 16, gap: 8 },
  finishBtn: { padding: 18, borderRadius: 16, alignItems: 'center', elevation: 1 },
});