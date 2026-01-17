// filename: src/screens/Learn.js
import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { MoneyContext } from '../context/MoneyContext';
import { getLessons } from '../data/lessons';
import { ThemedText } from '../components/ThemedText';
import { LucideCheckCircle, LucideBookOpen } from 'lucide-react-native';

export default function Learn() {
  const { userProfile, theme, completedLessons, completeLesson } = useContext(MoneyContext);
  if (!userProfile) return null;
  const lessons = getLessons(userProfile.ageGroup);

  const handleLessonPress = (lesson) => {
    if (completedLessons.includes(lesson.id)) return;
    completeLesson(lesson);
    alert(`🎉 Lesson Complete! You gained ${lesson.xp} XP.`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={[styles.iconBox, { backgroundColor: theme.primary + '20' }]}>
            <LucideBookOpen color={theme.primary} size={28} />
          </View>
          <View>
            <ThemedText type="h1" color={theme.text}>Academy</ThemedText>
            <ThemedText type="body" color={theme.text} style={{opacity: 0.6}}>{completedLessons.length} / {lessons.length} Completed</ThemedText>
          </View>
        </View>
        <View style={styles.grid}>
          {lessons.map((lesson) => {
            const isCompleted = completedLessons.includes(lesson.id);
            return (
              <TouchableOpacity key={lesson.id} style={[styles.card, { backgroundColor: theme.cardBg, borderLeftColor: isCompleted ? '#00b894' : theme.primary }]} onPress={() => handleLessonPress(lesson)} activeOpacity={0.8}>
                <View style={styles.cardHeader}>
                  <View style={[styles.iconCircle, { backgroundColor: theme.bg }]}>
                    <ThemedText style={{fontSize: 24}}>{lesson.icon}</ThemedText>
                  </View>
                  {isCompleted ? <LucideCheckCircle color="#00b894" size={24} /> : <View style={[styles.xpBadge, { backgroundColor: theme.primary }]}><ThemedText type="caption" color="white">+{lesson.xp} XP</ThemedText></View>}
                </View>
                <ThemedText type="h3" color={theme.text} style={{marginBottom: 8}}>{lesson.title}</ThemedText>
                <ThemedText type="body" color={theme.text} style={{opacity: 0.6}}>{lesson.desc}</ThemedText>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 24 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 32, gap: 16 },
  iconBox: { padding: 12, borderRadius: 16 },
  grid: { gap: 16 },
  card: { padding: 20, borderRadius: 24, borderLeftWidth: 6, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  iconCircle: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  xpBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
});