export const QUESTS = [
  // AGES 5-7
  { id: 'q1', title: 'Brush Teeth', reward: 0.50, ageGroup: '5-7', icon: '🦷' },
  { id: 'q2', title: 'Clean Up Toys', reward: 1.00, ageGroup: '5-7', icon: '🧸' },
  
  // AGES 8-10
  { id: 'q3', title: 'Read for 20 mins', reward: 2.00, ageGroup: '8-10', icon: '📖' },
  { id: 'q4', title: 'Feed the Pet', reward: 1.00, ageGroup: '8-10', icon: '🐶' },
  
  // AGES 11-13
  { id: 'q5', title: 'Empty Dishwasher', reward: 3.00, ageGroup: '11-13', icon: '🍽️' },
  { id: 'q6', title: 'Walk the Dog', reward: 5.00, ageGroup: '11-13', icon: '🐕' },

  // AGES 14-17
  { id: 'q7', title: 'Wash the Car', reward: 10.00, ageGroup: '14-17', icon: '🚗' },
  { id: 'q8', title: 'Cook Dinner', reward: 8.00, ageGroup: '14-17', icon: '👨‍🍳' }
];

export const getDailyQuests = (ageGroup) => {
  return QUESTS.filter(q => q.ageGroup === ageGroup);
};