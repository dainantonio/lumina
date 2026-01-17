// filename: src/screens/Dashboard.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MoneyContext } from '../context/MoneyContext';
import { LucideTrophy } from 'lucide-react-native';

const JarCard = ({ title, amount, color }) => (
  <View style={[styles.card, { borderTopColor: color }]}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardAmount}>${amount.toFixed(2)}</Text>
  </View>
);

export default function Dashboard({ navigation }) {
  const { wallet, stats, loading } = useContext(MoneyContext);
  const totalNetWorth = wallet.spend + wallet.save + wallet.grow + wallet.give;

  const xpToNextLevel = 50;
  const currentXP = stats.xp % xpToNextLevel;
  const progressPercent = (currentXP / xpToNextLevel) * 100;

  if (loading) return <View style={styles.center}><Text>Loading...</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Level {stats.level} Pilot 🚀</Text>
          <Text style={styles.subHeader}>Net Worth: ${totalNetWorth.toFixed(2)}</Text>
        </View>
        <View style={styles.xpCircle}>
           <Text style={styles.xpText}>{stats.xp} XP</Text>
        </View>
      </View>

      <View style={styles.xpContainer}>
        <View style={styles.xpBarBackground}>
          <View style={[styles.xpBarFill, { width: `${progressPercent}%` }]} />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Your Assets</Text>
      <View style={styles.grid}>
        <JarCard title="Spend" amount={wallet.spend} color="#FF7675" />
        <JarCard title="Save" amount={wallet.save} color="#4ECDC4" />
        <JarCard title="Grow" amount={wallet.grow} color="#FFE66D" />
        <JarCard title="Give" amount={wallet.give} color="#FF9F43" />
      </View>

      <View style={styles.banner}>
        <LucideTrophy color="white" size={24} />
        <View style={{marginLeft: 10, flex: 1}}>
          <Text style={styles.bannerTitle}>Current Mission:</Text>
          <Text style={styles.bannerSub}>Save $50 in your Grow Jar to unlock the 'Saver' badge!</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9FC', padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { marginTop: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting: { fontSize: 24, fontWeight: 'bold', color: '#2D3436' },
  subHeader: { fontSize: 16, color: '#636E72', marginTop: 5 },
  xpCircle: { backgroundColor: '#dfe6e9', padding: 10, borderRadius: 20 },
  xpText: { fontWeight: 'bold', color: '#636E72', fontSize: 12 },
  
  xpContainer: { marginBottom: 25 },
  xpBarBackground: { height: 8, backgroundColor: '#dfe6e9', borderRadius: 4, overflow: 'hidden' },
  xpBarFill: { height: '100%', backgroundColor: '#0984E3' },

  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 15, color: '#2D3436' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { 
    width: '48%', 
    backgroundColor: 'white', 
    padding: 20, 
    borderRadius: 16, 
    marginBottom: 15,
    borderTopWidth: 4,
    elevation: 2
  },
  cardTitle: { color: '#B2BEC3', fontWeight: 'bold', fontSize: 14, marginBottom: 5 },
  cardAmount: { fontSize: 24, fontWeight: 'bold', color: '#2D3436' },

  banner: {
    backgroundColor: '#6C5CE7',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40
  },
  bannerTitle: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  bannerSub: { color: 'rgba(255,255,255,0.8)', fontSize: 12, flexWrap: 'wrap' }
});