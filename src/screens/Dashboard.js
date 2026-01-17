import React, { useContext, useRef, useEffect } from "react";
import { StyleSheet, View, ScrollView, Animated } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MoneyContext } from '../context/MoneyContext';
import { getAvatar } from '../utils/avatars';
import { LESSONS } from '../data/lessons';

// CORRECTED IMPORTS (No more @ symbol)
import { ThemedText } from '../components/ThemedText';
import { BalanceCard } from '../components/BalanceCard';

export default function Dashboard() {
  const insets = useSafeAreaInsets();
  const { wallet, userProfile, theme, loading } = useContext(MoneyContext);
  
  // Animation Values
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
  }, []);

  if (loading || !userProfile) return null;

  const avatar = getAvatar(userProfile.avatarId);
  const totalBalance = wallet.spend + wallet.save + wallet.grow + wallet.give;
  
  // Calculate Progress
  const completedLessons = LESSONS.filter(l => l.completed).length;
  const nextLesson = LESSONS.find(l => !l.completed);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.bg }]}
      contentContainerStyle={{
        paddingTop: insets.top + 20,
        paddingBottom: 100,
        paddingHorizontal: 20,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. GREETING ROW */}
      <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
        <View style={styles.greetingText}>
          <ThemedText type="body" color={theme.text} style={{opacity: 0.6}}>Welcome back,</ThemedText>
          <ThemedText type="h1" color={theme.text}>{userProfile.name}</ThemedText>
        </View>
        <View style={[styles.avatarContainer, { backgroundColor: avatar.bg }]}>
          <ThemedText style={{fontSize: 30}}>{avatar.emoji}</ThemedText>
        </View>
      </Animated.View>

      {/* 2. TOTAL BALANCE HERO CARD */}
      <Animated.View style={[styles.section, { opacity: fadeAnim, transform: [{translateY: 0}] }]}>
        <View style={[styles.totalCard, { backgroundColor: theme.primary + '15', borderColor: theme.primary + '30' }]}>
          <ThemedText type="small" color={theme.text}>Total Balance</ThemedText>
          <ThemedText type="hero" color={theme.primary}>${totalBalance.toFixed(2)}</ThemedText>
        </View>
      </Animated.View>

      {/* 3. BALANCE GRID */}
      <View style={styles.section}>
        <View style={styles.balanceRow}>
          <BalanceCard type="spend" amount={wallet.spend} />
          <BalanceCard type="save" amount={wallet.save} />
        </View>
        <View style={styles.balanceRow}>
          <BalanceCard type="grow" amount={wallet.grow} />
          <BalanceCard type="give" amount={wallet.give} />
        </View>
      </View>

      {/* 4. PROGRESS SECTION */}
      <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
        <ThemedText type="h3" color={theme.text} style={styles.sectionTitle}>Your Progress</ThemedText>
        
        <View style={[styles.progressCard, { backgroundColor: theme.cardBg }]}>
          <View style={styles.progressInfo}>
            <ThemedText type="h2" color={theme.primary}>
              {completedLessons}/{LESSONS.length}
            </ThemedText>
            <ThemedText type="small" color={theme.text}>Lessons completed</ThemedText>
          </View>
          
          <View style={[styles.progressTrack, { backgroundColor: theme.bg }]}>
            <View 
              style={[
                styles.progressBar, 
                { 
                  backgroundColor: theme.primary, 
                  width: `${(completedLessons / LESSONS.length) * 100}%` 
                }
              ]} 
            />
          </View>
        </View>
      </Animated.View>

      {/* 5. NEXT LESSON CARD */}
      {nextLesson && (
        <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
          <ThemedText type="h3" color={theme.text} style={styles.sectionTitle}>Continue Learning</ThemedText>
          <View style={[styles.lessonCard, { backgroundColor: theme.cardBg }]}>
            <View style={[styles.lessonIcon, { backgroundColor: theme.secondary + '20' }]}>
              <ThemedText style={{fontSize: 24}}>{nextLesson.icon}</ThemedText>
            </View>
            <View style={styles.lessonContent}>
              <ThemedText type="h4" color={theme.text}>{nextLesson.title}</ThemedText>
              <ThemedText type="small" color={theme.text} numberOfLines={1}>{nextLesson.description}</ThemedText>
            </View>
            <View style={[styles.startBtn, { backgroundColor: theme.primary }]}>
              <ThemedText type="small" color="white" style={{fontWeight:'bold'}}>GO</ThemedText>
            </View>
          </View>
        </Animated.View>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  section: { marginBottom: 24 },
  sectionTitle: { marginBottom: 12 },
  
  greetingText: { flex: 1 },
  avatarContainer: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center' },
  
  totalCard: { padding: 24, borderRadius: 24, borderWidth: 1, alignItems: 'center' },
  
  balanceRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  
  progressCard: { padding: 20, borderRadius: 20, elevation: 1 },
  progressInfo: { marginBottom: 12 },
  progressTrack: { height: 8, borderRadius: 4, overflow: 'hidden' },
  progressBar: { height: '100%', borderRadius: 4 },
  
  lessonCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 20, elevation: 1 },
  lessonIcon: { width: 48, height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  lessonContent: { flex: 1 },
  startBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 }
});