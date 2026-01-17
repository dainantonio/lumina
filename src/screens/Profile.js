// filename: src/screens/Profile.js
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Platform } from 'react-native';
import { MoneyContext } from '../context/MoneyContext';
import { LucideUser, LucideTrash2, LucideShieldCheck, LucideLock } from 'lucide-react-native';

export default function Profile() {
  const { wallet, stats, resetGame } = useContext(MoneyContext);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [answer, setAnswer] = useState('');

  const badges = [
    { id: 1, name: "Saver", icon: "🐷", unlocked: wallet.save > 50 },
    { id: 2, name: "Investor", icon: "📈", unlocked: wallet.grow > 100 },
    { id: 3, name: "Giver", icon: "❤️", unlocked: stats.generosity > 20 },
    { id: 4, name: "Genius", icon: "🧠", unlocked: stats.wisdom > 15 },
    { id: 5, name: "Rock", icon: "🛡️", unlocked: stats.discipline > 20 },
    { id: 6, name: "Tycoon", icon: "🚀", unlocked: wallet.spend + wallet.save + wallet.grow > 500 }
  ];

  const handleParentCheck = () => {
    if (answer === '28') {
      setModalVisible(false);
      setAnswer('');
      resetGame();
      // Small timeout to allow modal to close before alerting
      setTimeout(() => alert("✅ Game Reset Successfully"), 100);
    } else {
      alert("❌ Incorrect. Access Denied.");
      setAnswer('');
    }
  };

  return (
    <View style={styles.mainContainer}>
      
      {/* --- PARENT GATE MODAL (Now outside ScrollView) --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <LucideLock size={40} color="#2D3436" />
            <Text style={styles.modalTitle}>Parent Gate</Text>
            <Text style={styles.modalText}>To protect this account, please answer:</Text>
            <Text style={styles.mathProblem}>What is 4 x 7?</Text>
            
            <TextInput 
              style={styles.input}
              keyboardType="numeric"
              onChangeText={setAnswer}
              value={answer}
              placeholder="?"
              placeholderTextColor="#ccc"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmBtn} onPress={handleParentCheck}>
                <Text style={styles.confirmText}>Unlock</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* --- SCROLLABLE CONTENT --- */}
      <ScrollView style={styles.scrollView} contentContainerStyle={{padding: 20}}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <LucideUser size={40} color="white" />
          </View>
          <Text style={styles.name}>Level {stats.level} Pilot</Text>
          <Text style={styles.xp}>{stats.xp} XP Total</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Generosity</Text>
            <Text style={styles.statValue}>{stats.generosity}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Wisdom</Text>
            <Text style={styles.statValue}>{stats.wisdom}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Discipline</Text>
            <Text style={styles.statValue}>{stats.discipline}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Mission Badges</Text>
        <View style={styles.badgeGrid}>
          {badges.map(badge => (
            <View key={badge.id} style={[styles.badge, !badge.unlocked && styles.lockedBadge]}>
              <Text style={styles.badgeIcon}>{badge.unlocked ? badge.icon : "🔒"}</Text>
              <Text style={styles.badgeName}>{badge.name}</Text>
            </View>
          ))}
        </View>

        <View style={styles.dangerZone}>
          <Text style={styles.dangerTitle}>Parental Controls</Text>
          <TouchableOpacity style={styles.resetBtn} onPress={() => setModalVisible(true)}>
            <LucideTrash2 size={20} color="#FF7675" />
            <Text style={styles.resetText}>Reset Save Data</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <LucideShieldCheck size={16} color="#00b894" />
          <Text style={styles.footerText}>COPPA Compliant • Secure Local Storage</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#F7F9FC' }, // Wrapper for everything
  scrollView: { flex: 1 },
  
  header: { alignItems: 'center', marginBottom: 30, marginTop: 20 },
  avatar: { width: 80, height: 80, backgroundColor: '#6C5CE7', borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 10, elevation: 5 },
  name: { fontSize: 24, fontWeight: 'bold', color: '#2D3436' },
  xp: { fontSize: 16, color: '#636E72' },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  statBox: { backgroundColor: 'white', width: '30%', padding: 15, borderRadius: 12, alignItems: 'center', elevation: 2 },
  statLabel: { fontSize: 12, color: '#B2BEC3', marginBottom: 5 },
  statValue: { fontSize: 20, fontWeight: 'bold', color: '#2D3436' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#2D3436', marginBottom: 15 },
  badgeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 40 },
  badge: { width: '31%', aspectRatio: 1, backgroundColor: 'white', borderRadius: 15, justifyContent: 'center', alignItems: 'center', elevation: 2 },
  lockedBadge: { backgroundColor: '#E3E8EE', opacity: 0.7 },
  badgeIcon: { fontSize: 30, marginBottom: 5 },
  badgeName: { fontSize: 12, fontWeight: '600', color: '#636E72' },
  dangerZone: { marginTop: 20, borderTopWidth: 1, borderTopColor: '#dfe6e9', paddingTop: 20 },
  dangerTitle: { fontSize: 16, fontWeight: 'bold', color: '#2D3436', marginBottom: 10 },
  resetBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff0f0', padding: 15, borderRadius: 10 },
  resetText: { color: '#FF7675', fontWeight: 'bold', marginLeft: 10 },
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 40, marginBottom: 40, gap: 5 },
  footerText: { color: '#00b894', fontSize: 12, fontWeight: 'bold' },
  
  // MODAL STYLES (UPDATED FOR WEB)
  modalOverlay: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0,0,0,0.5)',
    ...Platform.select({
      web: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        height: '100vh', // Forces full height on browser
        width: '100vw'
      }
    })
  },
  modalView: { width: '85%', backgroundColor: 'white', borderRadius: 20, padding: 35, alignItems: 'center', elevation: 5 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 10, marginBottom: 5 },
  modalText: { marginBottom: 15, textAlign: 'center', color: '#636E72' },
  mathProblem: { fontSize: 24, fontWeight: 'bold', color: '#6C5CE7', marginBottom: 20 },
  input: { height: 50, width: '100%', borderColor: '#dfe6e9', borderWidth: 2, borderRadius: 10, paddingHorizontal: 10, fontSize: 20, textAlign: 'center', marginBottom: 20 },
  modalButtons: { flexDirection: 'row', gap: 10 },
  cancelBtn: { backgroundColor: '#dfe6e9', padding: 15, borderRadius: 10, flex: 1, alignItems: 'center' },
  confirmBtn: { backgroundColor: '#6C5CE7', padding: 15, borderRadius: 10, flex: 1, alignItems: 'center' },
  cancelText: { fontWeight: 'bold', color: '#636E72' },
  confirmText: { fontWeight: 'bold', color: 'white' }
});