// filename: src/screens/Dilemma.js
import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MoneyContext } from '../context/MoneyContext';
import { storyDatabase } from '../data/allStories';
import { LucideZap, LucideRefreshCw } from 'lucide-react-native';
import { ThemedText } from '../components/ThemedText';

export default function Dilemma({ navigation }) {
  const { makeDecision, userProfile, theme } = useContext(MoneyContext);
  const [scenario, setScenario] = useState(null);

  useEffect(() => { loadStory(); }, []);

  const loadStory = () => {
    const ageSpecificStories = storyDatabase.filter(s => s.age === userProfile.ageGroup);
    const pool = ageSpecificStories.length > 0 ? ageSpecificStories : storyDatabase;
    setScenario(pool[Math.floor(Math.random() * pool.length)]);
  };

  const handleChoice = (option) => {
    if (option.cost > 0) {
      if (!makeDecision(option.cost, option.category, option.impact)) { alert("❌ Not enough money!"); return; }
    } else { makeDecision(0, option.category, option.impact); }
    alert(`✅ Choice Recorded!`);
    loadStory();
  };

  if (!scenario) return null;

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={styles.header}>
        <View style={[styles.iconBox, { backgroundColor: theme.primary + '15' }]}>
          <LucideZap color={theme.primary} size={28} />
        </View>
        <ThemedText type="h1" color={theme.text}>Daily Dilemma</ThemedText>
      </View>
      <View style={[styles.card, { backgroundColor: theme.cardBg }]}>
        <View style={styles.tagContainer}>
          <View style={[styles.tag, { backgroundColor: theme.bg }]}>
             <ThemedText type="caption" style={{color: theme.primary}}>{userProfile.ageGroup} EDITION</ThemedText>
          </View>
        </View>
        <ThemedText type="h2" color={theme.text} style={{textAlign:'center', marginBottom: 16}}>{scenario.title}</ThemedText>
        <ThemedText type="body" color={theme.text} style={{textAlign:'center', marginBottom: 32, opacity: 0.8}}>{scenario.story}</ThemedText>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#FF7675' }]} onPress={() => handleChoice(scenario.optionA)}>
          <ThemedText type="h3" color="white">{scenario.optionA.text}</ThemedText>
          <ThemedText type="small" color="white" style={{opacity:0.9, marginTop:4}}>{scenario.optionA.category.toUpperCase()} • {Object.keys(scenario.optionA.impact)[0]} {Object.values(scenario.optionA.impact)[0]}</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#74B9FF' }]} onPress={() => handleChoice(scenario.optionB)}>
          <ThemedText type="h3" color="white">{scenario.optionB.text}</ThemedText>
          <ThemedText type="small" color="white" style={{opacity:0.9, marginTop:4}}>{scenario.optionB.category.toUpperCase()} • {Object.keys(scenario.optionB.impact)[0]} {Object.values(scenario.optionB.impact)[0]}</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skipButton} onPress={loadStory}>
          <LucideRefreshCw size={14} color="#B2BEC3" style={{marginRight:6}} />
          <ThemedText type="small" style={{color:'#B2BEC3', fontWeight:'700'}}>Skip this story</ThemedText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 32, gap: 12 },
  iconBox: { padding: 16, borderRadius: 20 },
  card: { padding: 32, borderRadius: 32, elevation: 5, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 20 },
  tagContainer: { alignItems: 'center', marginBottom: 24 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  button: { padding: 20, borderRadius: 20, marginBottom: 16, alignItems: 'center', width: '100%' },
  skipButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 16 },
});