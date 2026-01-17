// filename: src/screens/Dilemma.js
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { MoneyContext } from '../context/MoneyContext';
import { stories } from '../data/stories'; // Import the database

export default function Dilemma({ navigation }) {
  const { makeDecision } = useContext(MoneyContext);
  const [scenario, setScenario] = useState(null);

  // LOGIC: Pick a random story when the screen loads
  useEffect(() => {
    loadRandomStory();
  }, []);

  const loadRandomStory = () => {
    const randomIndex = Math.floor(Math.random() * stories.length);
    setScenario(stories[randomIndex]);
  };

  const handleChoice = (option) => {
    // 1. Check if they have enough money (if cost > 0)
    if (option.cost > 0) {
      const success = makeDecision(option.cost, option.category, option.impact);
      if (!success) {
        // Web-friendly alert
        alert("❌ Not enough money in your Spend Jar!"); 
        return;
      }
    } else {
      // Free actions still update stats
      makeDecision(0, option.category, option.impact);
    }

    // 2. Success Message
    alert(`✅ Choice Recorded!\n\nStats Updated:\n❤️ Generosity: ${option.impact.generosity > 0 ? '+' : ''}${option.impact.generosity}\n🧠 Wisdom: ${option.impact.wisdom > 0 ? '+' : ''}${option.impact.wisdom}`);
    
    // 3. Load a new story for next time
    loadRandomStory();
    
    // 4. Send them back to dashboard
    navigation.navigate('Home');
  };

  if (!scenario) return <View style={styles.container}><Text>Loading...</Text></View>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Daily Dilemma ⚡</Text>
      
      <View style={styles.card}>
        <Text style={styles.title}>{scenario.title}</Text>
        <Text style={styles.story}>{scenario.story}</Text>
        
        <View style={styles.divider} />

        <TouchableOpacity style={styles.buttonA} onPress={() => handleChoice(scenario.optionA)}>
          <Text style={styles.btnText}>{scenario.optionA.text}</Text>
          <Text style={styles.subText}>
            Impact: {scenario.optionA.impact.generosity} ❤️ | {scenario.optionA.impact.wisdom} 🧠
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonB} onPress={() => handleChoice(scenario.optionB)}>
          <Text style={styles.btnText}>{scenario.optionB.text}</Text>
          <Text style={styles.subText}>
            Impact: {scenario.optionB.impact.generosity} ❤️ | {scenario.optionB.impact.wisdom} 🧠
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.skipButton} onPress={loadRandomStory}>
          <Text style={styles.skipText}>🔄 Skip this story</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#6C5CE7', padding: 20, justifyContent: 'center' },
  header: { fontSize: 28, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: 20 },
  card: { backgroundColor: 'white', padding: 25, borderRadius: 20, elevation: 5, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, textAlign: 'center', color: '#2D3436' },
  story: { fontSize: 18, marginBottom: 20, lineHeight: 28, color: '#636E72', textAlign: 'center' },
  divider: { height: 1, backgroundColor: '#DFE6E9', marginBottom: 20 },
  buttonA: { backgroundColor: '#FF7675', padding: 18, borderRadius: 12, marginBottom: 15 },
  buttonB: { backgroundColor: '#74B9FF', padding: 18, borderRadius: 12, marginBottom: 15 },
  btnText: { color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  subText: { color: 'rgba(255,255,255,0.95)', fontSize: 13, textAlign: 'center', marginTop: 5, fontWeight: '600' },
  skipButton: { alignItems: 'center', marginTop: 10 },
  skipText: { color: '#B2BEC3', fontSize: 14 }
});