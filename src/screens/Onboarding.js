// filename: src/screens/Onboarding.js
import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { MoneyContext } from '../context/MoneyContext';
import { AVATARS } from '../utils/avatars';
import { LucideCheckCircle, LucideRocket, LucideChevronRight } from 'lucide-react-native';
import { ThemedText } from '../components/ThemedText';

const AGE_GROUPS = [
  { id: '5-7', title: 'Little Learner', subtitle: 'Ages 5-7', color: '#FF7675' },
  { id: '8-10', title: 'Money Explorer', subtitle: 'Ages 8-10', color: '#6C5CE7' },
  { id: '11-13', title: 'Smart Saver', subtitle: 'Ages 11-13', color: '#4ECDC4' },
  { id: '14-17', title: 'Future Investor', subtitle: 'Ages 14-17', color: '#FFE66D' },
];

export default function Onboarding() {
  const { login } = useContext(MoneyContext);
  const [step, setStep] = useState(0); 
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [name, setName] = useState('');

  const handleNext = () => {
    if (step === 3 && name.length > 0) login(name, selectedAge.id, selectedAvatar.id);
    else setStep(step + 1);
  };

  if (step === 0) {
    return (
      <View style={styles.splashContainer}>
        <View style={styles.splashContent}>
          <View style={styles.logoCircle}><LucideRocket size={64} color="white" /></View>
          <ThemedText type="hero" color="white" style={{marginBottom: 8}}>Lumina</ThemedText>
          <ThemedText type="h3" color="rgba(255,255,255,0.8)">Money Mindset for Kids</ThemedText>
        </View>
        <TouchableOpacity style={styles.splashBtn} onPress={() => setStep(1)}>
          <ThemedText type="h3" color="#6C5CE7">Get Started</ThemedText>
          <LucideChevronRight color="#6C5CE7" size={24} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${(step / 3) * 100}%` }]} /></View>
        <TouchableOpacity onPress={() => setStep(step - 1)}><ThemedText type="small" style={{fontWeight:'bold'}}>Back</ThemedText></TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {step === 1 && (
          <>
            <ThemedText type="h1" style={{marginBottom: 8}}>Pick Your Level</ThemedText>
            <ThemedText type="body" style={{marginBottom: 32, opacity: 0.6}}>We customize the money lessons for you.</ThemedText>
            <View style={styles.grid}>
              {AGE_GROUPS.map((group) => (
                <TouchableOpacity key={group.id} style={[styles.ageCard, selectedAge?.id === group.id && styles.selectedAgeCard, { borderLeftColor: group.color }]} onPress={() => setSelectedAge(group)}>
                  <View><ThemedText type="h3">{group.title}</ThemedText><ThemedText type="small">{group.subtitle}</ThemedText></View>
                  {selectedAge?.id === group.id && <LucideCheckCircle color="#6C5CE7" size={24} />}
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
        {step === 2 && (
          <>
            <ThemedText type="h1" style={{marginBottom: 8}}>Choose a Buddy</ThemedText>
            <ThemedText type="body" style={{marginBottom: 32, opacity: 0.6}}>They will help you learn!</ThemedText>
            <View style={styles.avatarGrid}>
              {AVATARS.map((avatar) => (
                <TouchableOpacity key={avatar.id} style={[styles.avatarCard, selectedAvatar?.id === avatar.id && styles.selectedAvatarCard]} onPress={() => setSelectedAvatar(avatar)}>
                  <View style={[styles.avatarCircle, { backgroundColor: avatar.bg }]}><ThemedText style={{fontSize: 40}}>{avatar.emoji}</ThemedText></View>
                  <ThemedText type="h4">{avatar.name}</ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
        {step === 3 && (
          <>
            <ThemedText type="h1" style={{marginBottom: 32}}>What's your name?</ThemedText>
            <View style={styles.inputWrapper}>
              <TextInput style={styles.input} placeholder="Type your name..." placeholderTextColor="#B2BEC3" value={name} onChangeText={setName} autoFocus />
            </View>
          </>
        )}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={[styles.nextBtn, (!selectedAge && step===1) || (!selectedAvatar && step===2) ? styles.disabledBtn : {}]} onPress={handleNext} disabled={step===1 && !selectedAge || step===2 && !selectedAvatar}>
          <ThemedText type="h3" color="white">{step === 3 ? "Launch App 🚀" : "Continue"}</ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  splashContainer: { flex: 1, backgroundColor: '#6C5CE7', justifyContent: 'center', padding: 32 },
  splashContent: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  logoCircle: { width: 120, height: 120, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 60, justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  splashBtn: { backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 20, borderRadius: 24, marginBottom: 40, gap: 12 },
  container: { flex: 1, backgroundColor: '#F8F9FE' },
  header: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 16 },
  progressTrack: { height: 6, backgroundColor: '#E0E0E0', borderRadius: 3, marginBottom: 16 },
  progressFill: { height: '100%', backgroundColor: '#6C5CE7', borderRadius: 3 },
  content: { padding: 24 },
  grid: { gap: 16 },
  ageCard: { backgroundColor: 'white', padding: 24, borderRadius: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderLeftWidth: 6, shadowColor: '#000', shadowOpacity: 0.05, elevation: 1 },
  selectedAgeCard: { backgroundColor: '#F0F3FF', transform: [{scale: 1.02}] },
  avatarGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 16 },
  avatarCard: { width: '47%', backgroundColor: 'white', padding: 20, borderRadius: 24, alignItems: 'center', borderWidth: 2, borderColor: 'transparent', elevation: 1 },
  selectedAvatarCard: { borderColor: '#6C5CE7', backgroundColor: '#F0F3FF' },
  avatarCircle: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  inputWrapper: { backgroundColor: 'white', padding: 24, borderRadius: 24, elevation: 1 },
  input: { fontSize: 24, fontWeight: 'bold', color: '#2D3436' },
  footer: { padding: 24, backgroundColor: '#F8F9FE' },
  nextBtn: { backgroundColor: '#0984E3', padding: 20, borderRadius: 24, alignItems: 'center', shadowColor: '#0984E3', shadowOpacity: 0.2, elevation: 4 },
  disabledBtn: { backgroundColor: '#B2BEC3', shadowOpacity: 0 },
});