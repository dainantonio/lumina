// filename: src/screens/TimeMachine.js
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { MoneyContext } from '../context/MoneyContext';
import { LineChart } from 'react-native-chart-kit';
import Slider from '@react-native-community/slider';

export default function TimeMachine() {
  const { wallet, calculateFutureValue } = useContext(MoneyContext);
  const [years, setYears] = useState(10);

  const futureValue = calculateFutureValue(years);
  
  // Calculate data points for the chart
  const dataPoints = [0, 5, 10, 15, 20, 25].map(y => 
    parseFloat(calculateFutureValue(y))
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Time Machine ⏳</Text>
      
      <View style={styles.card}>
        <Text style={styles.subtext}>
          If you invest your <Text style={{fontWeight:'bold'}}>${wallet.grow.toFixed(0)}</Text> today...
        </Text>

        <LineChart
          data={{
            labels: ["0y", "5y", "10y", "15y", "20y", "25y"],
            datasets: [{ data: dataPoints }]
          }}
          width={Dimensions.get("window").width - 60}
          height={220}
          yAxisLabel="$"
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(108, 92, 231, ${opacity})`, // Purple color
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
            propsForDots: { r: "6", strokeWidth: "2", stroke: "#a29bfe" }
          }}
          style={{ marginVertical: 20, borderRadius: 16 }}
          bezier
        />

        <View style={styles.resultBox}>
          <Text style={styles.resultLabel}>In {years} years, you have:</Text>
          <Text style={styles.resultValue}>${futureValue}</Text>
        </View>

        <Text style={styles.sliderLabel}>Travel Forward: +{years} Years</Text>
        <Slider
          style={{width: '100%', height: 40}}
          minimumValue={1}
          maximumValue={50}
          step={1}
          minimumTrackTintColor="#6C5CE7"
          maximumTrackTintColor="#dfe6e9"
          thumbTintColor="#6C5CE7"
          value={years}
          onValueChange={setYears}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9FC', padding: 20 },
  header: { fontSize: 28, fontWeight: 'bold', marginTop: 20, marginBottom: 20, color: '#2D3436' },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 20, elevation: 2, marginBottom: 40 },
  subtext: { fontSize: 16, color: '#636E72', textAlign: 'center', marginBottom: 10 },
  resultBox: { backgroundColor: '#ffeaa7', padding: 15, borderRadius: 12, alignItems: 'center', marginBottom: 20 },
  resultLabel: { fontSize: 14, color: '#2D3436', fontWeight: '600' },
  resultValue: { fontSize: 32, fontWeight: 'bold', color: '#2D3436' },
  sliderLabel: { fontSize: 14, color: '#636E72', marginBottom: 5, textAlign: 'center' }
});