// filename: src/screens/Payday.js
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { MoneyContext } from '../context/MoneyContext';
import { LucideDollarSign, LucidePiggyBank, LucideTrendingUp, LucideHeart } from 'lucide-react-native';

export default function Payday({ navigation }) {
  const { addIncome } = useContext(MoneyContext);
  
  const TOTAL_PAY = 20;
  const [unallocated, setUnallocated] = useState(TOTAL_PAY);
  const [allocations, setAllocations] = useState({ spend: 0, save: 0, grow: 0, give: 0 });

  const distribute = (category, amount) => {
    if (unallocated - amount < 0) return; // Can't spend money you don't have
    
    setUnallocated(prev => prev - amount);
    setAllocations(prev => ({
      ...prev,
      [category]: prev[category] + amount
    }));
  };

  const handleFinish = () => {
    if (unallocated > 0) {
      alert(`You still have $${unallocated} left to sort! Give every dollar a job.`);
      return;
    }
    addIncome(allocations);
    alert("🎉 Payday Complete! Money added to jars.");
    
    // Reset for next time
    setUnallocated(TOTAL_PAY);
    setAllocations({ spend: 0, save: 0, grow: 0, give: 0 });
    
    navigation.navigate('Home');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Payday! 💸</Text>
      <Text style={styles.subHeader}>You earned <Text style={{fontWeight:'bold'}}>${TOTAL_PAY}.00</Text>. Sort it into your jars.</Text>
      
      <View style={styles.remainingBox}>
        <Text style={styles.remainingLabel}>Left to Sort</Text>
        <Text style={styles.remainingAmount}>${unallocated}</Text>
      </View>

      <View style={styles.grid}>
        {/* SPEND JAR */}
        <AllocationCard 
          title="Spend" 
          icon={<LucideDollarSign color="#FF7675" />} 
          amount={allocations.spend} 
          onAdd={() => distribute('spend', 1)}
          color="#FF7675"
        />

        {/* SAVE JAR */}
        <AllocationCard 
          title="Save" 
          icon={<LucidePiggyBank color="#4ECDC4" />} 
          amount={allocations.save} 
          onAdd={() => distribute('save', 1)}
          color="#4ECDC4"
        />

        {/* GROW JAR */}
        <AllocationCard 
          title="Grow" 
          icon={<LucideTrendingUp color="#FFE66D" />} 
          amount={allocations.grow} 
          onAdd={() => distribute('grow', 1)}
          color="#FFE66D"
        />

        {/* GIVE JAR */}
        <AllocationCard 
          title="Give" 
          icon={<LucideHeart color="#FF9F43" />} 
          amount={allocations.give} 
          onAdd={() => distribute('give', 1)}
          color="#FF9F43"
        />
      </View>

      <TouchableOpacity 
        style={[styles.finishBtn, { opacity: unallocated === 0 ? 1 : 0.5 }]} 
        onPress={handleFinish}
      >
        <Text style={styles.btnText}>{unallocated === 0 ? "Finish Payday ✅" : "Sort All Money First"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const AllocationCard = ({ title, icon, amount, onAdd, color }) => (
  <TouchableOpacity style={[styles.card, { borderLeftColor: color }]} onPress={onAdd}>
    <View style={styles.cardHeader}>
      {icon}
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
    <Text style={styles.cardAmount}>+ ${amount}</Text>
    <Text style={styles.tapHint}>Tap to add $1</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9FC', padding: 20 },
  header: { fontSize: 28, fontWeight: 'bold', color: '#2D3436', marginTop: 10 },
  subHeader: { fontSize: 16, color: '#636E72', marginBottom: 20 },
  remainingBox: { backgroundColor: '#2D3436', borderRadius: 15, padding: 20, alignItems: 'center', marginBottom: 20 },
  remainingLabel: { color: '#dfe6e9', fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 },
  remainingAmount: { color: 'white', fontSize: 36, fontWeight: 'bold' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '48%', backgroundColor: 'white', padding: 15, borderRadius: 15, marginBottom: 15, borderLeftWidth: 4, elevation: 2 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
  cardTitle: { fontWeight: 'bold', fontSize: 16, color: '#2D3436' },
  cardAmount: { fontSize: 24, fontWeight: 'bold', color: '#2D3436' },
  tapHint: { fontSize: 12, color: '#B2BEC3', marginTop: 5 },
  finishBtn: { backgroundColor: '#0984E3', padding: 18, borderRadius: 15, alignItems: 'center', marginTop: 10, marginBottom: 40 },
  btnText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});