// filename: src/screens/TimeMachine.js
import React, { useContext, useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { MoneyContext } from '../context/MoneyContext';
import { LineChart } from 'react-native-chart-kit';
import Slider from '@react-native-community/slider';
import { LucideClock, LucideTrendingUp } from 'lucide-react-native';
import { ThemedText } from '../components/ThemedText';

const screenWidth = Dimensions.get("window").width;

export default function TimeMachine() {
  const { calculateFutureValue, userProfile, theme, riskLevel, setRiskLevel } = useContext(MoneyContext);
  const [years, setYears] = useState(10);
  const futureValue = calculateFutureValue(years);
  
  const risks = [
    { id: 'low', label: 'Safe (3%)', color: '#00b894' },
    { id: 'medium', label: 'Balanced (8%)', color: '#0984E3' },
    { id: 'high', label: 'Risky (12%)', color: '#FF7675' }
  ];

  const dataPoints = [0, 5, 10, 15, 20, 25].map(y => parseFloat(calculateFutureValue(y)));
  const isTeen = userProfile?.ageGroup === '14-17';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={[styles.iconBox, { backgroundColor: 'white' }]}>
            <LucideClock color={theme.primary} size={28} />
          </View>
          <ThemedText type="h1" color={theme.text}>Time Machine</ThemedText>
        </View>
        <View style={[styles.mainCard, { backgroundColor: theme.cardBg }]}>
          <ThemedText type="caption" color="#B2BEC3" style={{marginBottom: 8}}>FUTURE VALUE</ThemedText>
          <ThemedText type="hero" color={theme.text} style={{marginBottom: 12}}>${futureValue}</ThemedText>
          <View style={styles.pillRow}>
             <View style={[styles.pill, {backgroundColor: '#E3FDF5'}]}>
                <LucideTrendingUp size={16} color="#00b894" />
                <ThemedText type="small" style={{color:'#00b894', fontWeight:'700'}}>{riskLevel === 'low' ? '3%' : riskLevel === 'medium' ? '8%' : '12%'} Growth</ThemedText>
             </View>
          </View>
        </View>
        {isTeen && (
          <View style={styles.section}>
            <ThemedText type="h3" color={theme.text} style={{marginBottom: 12}}>Investment Strategy</ThemedText>
            <View style={styles.riskGrid}>
              {risks.map(r => (
                 <TouchableOpacity key={r.id} style={[styles.riskCard, { backgroundColor: theme.cardBg, borderColor: riskLevel === r.id ? r.color : 'transparent', borderWidth: 2 }]} onPress={() => setRiskLevel(r.id)}>
                    <ThemedText type="h4" color={theme.text}>{r.label}</ThemedText>
                 </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        <View style={styles.chartContainer}>
          <LineChart
            data={{ labels: ["0y", "5y", "10y", "15y", "20y", "25y"], datasets: [{ data: dataPoints }] }}
            width={screenWidth - 40} height={240} yAxisLabel="$"
            chartConfig={{ backgroundColor: theme.bg, backgroundGradientFrom: theme.bg, backgroundGradientTo: theme.bg, decimalPlaces: 0, color: (opacity = 1) => theme.primary, labelColor: (opacity = 1) => theme.text, style: { borderRadius: 16 }, propsForDots: { r: "5", strokeWidth: "2", stroke: theme.primary } }}
            style={{ marginVertical: 8, borderRadius: 16 }} bezier
          />
        </View>
        <View style={[styles.controls, { backgroundColor: theme.cardBg }]}>
          <ThemedText type="body" color={theme.text} style={{textAlign:'center', marginBottom: 12}}>Traveling to: <ThemedText type="h4" color={theme.primary}>+{years} Years</ThemedText></ThemedText>
          <Slider style={{width: '100%', height: 40}} minimumValue={1} maximumValue={50} step={1} minimumTrackTintColor={theme.primary} maximumTrackTintColor={theme.bg} thumbTintColor={theme.primary} value={years} onValueChange={setYears} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 24 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 24, gap: 16 },
  iconBox: { padding: 12, borderRadius: 16, elevation: 1 },
  mainCard: { padding: 24, borderRadius: 24, alignItems: 'center', marginBottom: 24, elevation: 1 },
  pillRow: { flexDirection: 'row', gap: 8 },
  pill: { flexDirection: 'row', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, alignItems: 'center', gap: 6 },
  chartContainer: { alignItems: 'center', marginBottom: 24 },
  controls: { padding: 24, borderRadius: 24, marginBottom: 24, elevation: 1 },
  section: { marginBottom: 24 },
  riskGrid: { flexDirection: 'row', gap: 8 },
  riskCard: { flex: 1, padding: 16, borderRadius: 16, alignItems: 'center', elevation: 1 },
});