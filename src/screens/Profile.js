// filename: src/screens/Profile.js
import React, { useContext, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Platform, SafeAreaView } from 'react-native';
import { MoneyContext } from '../context/MoneyContext';
import { LucideTrash2, LucideShieldCheck, LucideLock } from 'lucide-react-native';
import { getAvatar } from '../utils/avatars';
import { ThemedText } from '../components/ThemedText';

export default function Profile() {
  const { wallet, stats, logout, userProfile, theme } = useContext(MoneyContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [answer, setAnswer] = useState('');

  if (!userProfile) return null;
  const avatar = getAvatar(userProfile.avatarId);
  const badges = [
    { id: 1, name: "Saver", icon: "🐷", unlocked: wallet.save > 50 },
    { id: 2, name: "Investor", icon: "📈", unlocked: wallet.grow > 100 },
    { id: 3, name: "Giver", icon: "❤️", unlocked: stats.generosity > 20 },
    { id: 4, name: "Genius", icon: "🧠", unlocked: stats.wisdom > 15 },
    { id: 5, name: "Rock", icon: "🛡️", unlocked: stats.discipline > 20 },
    { id: 6, name: "Tycoon", icon: "🚀", unlocked: wallet.spend + wallet.save + wallet.grow > 500 }
  ];

  const handleParentCheck = () => {
    if (answer === '28') { setModalVisible(false); setAnswer(''); logout(); } 
    else { alert("❌ Incorrect. Access Denied."); setAnswer(''); }
  };

  return (
    <SafeAreaView style={[styles.mainContainer, { backgroundColor: theme.bg }]}>
      <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <LucideLock size={40} color="#2D3436" />
            <ThemedText type="h2" style={{marginTop:16, marginBottom:8}}>Parent Gate</ThemedText>
            <ThemedText type="body" style={{textAlign:'center', marginBottom:16}}>To delete this save file, solve this:</ThemedText>
            <ThemedText type="h1" color="#6C5CE7" style={{marginBottom:24}}>4 x 7 = ?</ThemedText>
            <TextInput style={styles.input} keyboardType="numeric" onChangeText={setAnswer} value={answer} placeholder="?" autoFocus />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}><ThemedText type="h4" color="#636E72">Cancel</ThemedText></TouchableOpacity>
              <TouchableOpacity style={styles.confirmBtn} onPress={handleParentCheck}><ThemedText type="h4" color="white">Unlock</ThemedText></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView contentContainerStyle={{padding: 24}}>
        <View style={styles.header}>
          <View style={[styles.avatarCircle, { backgroundColor: avatar.bg }]}>
             <ThemedText style={{fontSize: 48}}>{avatar.emoji}</ThemedText>
          </View>
          <ThemedText type="h1" color={theme.text}>{userProfile.name}</ThemedText>
          <ThemedText type="body" color={theme.text} style={{opacity:0.6}}>{stats.xp} XP • Level {stats.level}</ThemedText>
        </View>
        <View style={styles.statsGrid}>
          {['Generosity', 'Wisdom', 'Discipline'].map((stat, i) => (
            <View key={stat} style={[styles.statBox, { backgroundColor: theme.cardBg }]}>
              <ThemedText type="caption" style={{marginBottom:4}}>{stat}</ThemedText>
              <ThemedText type="h2" color={theme.text}>{i===0 ? stats.generosity : i===1 ? stats.wisdom : stats.discipline}</ThemedText>
            </View>
          ))}
        </View>
        <ThemedText type="h3" color={theme.text} style={{marginBottom: 16}}>Badges</ThemedText>
        <View style={styles.badgeGrid}>
          {badges.map(badge => (
            <View key={badge.id} style={[styles.badge, { backgroundColor: theme.cardBg }, !badge.unlocked && styles.lockedBadge]}>
              <ThemedText style={{fontSize: 32, marginBottom: 4}}>{badge.unlocked ? badge.icon : "🔒"}</ThemedText>
              <ThemedText type="caption">{badge.name}</ThemedText>
            </View>
          ))}
        </View>
        <View style={styles.dangerZone}>
          <ThemedText type="h4" color={theme.text} style={{marginBottom: 12}}>Settings</ThemedText>
          <TouchableOpacity style={styles.resetBtn} onPress={() => setModalVisible(true)}>
            <LucideTrash2 size={20} color="#FF7675" />
            <ThemedText type="h4" color="#FF7675" style={{marginLeft: 12}}>Reset Save Data</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  header: { alignItems: 'center', marginBottom: 32, marginTop: 16 },
  avatarCircle: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32, gap: 12 },
  statBox: { flex: 1, padding: 16, borderRadius: 20, alignItems: 'center' },
  badgeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 40 },
  badge: { width: '30%', aspectRatio: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  lockedBadge: { opacity: 0.5 },
  dangerZone: { marginTop: 24, borderTopWidth: 1, borderTopColor: '#dfe6e9', paddingTop: 24 },
  resetBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff0f0', padding: 16, borderRadius: 16 },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', ...Platform.select({ web: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 } }) },
  modalView: { width: '85%', backgroundColor: 'white', borderRadius: 24, padding: 32, alignItems: 'center', elevation: 10 },
  input: { height: 56, width: '100%', backgroundColor: '#F0F3F8', borderRadius: 16, fontSize: 24, textAlign: 'center', marginBottom: 24 },
  modalButtons: { flexDirection: 'row', gap: 12, width: '100%' },
  cancelBtn: { backgroundColor: '#F0F3F8', padding: 16, borderRadius: 16, flex: 1, alignItems: 'center' },
  confirmBtn: { backgroundColor: '#6C5CE7', padding: 16, borderRadius: 16, flex: 1, alignItems: 'center' }
});