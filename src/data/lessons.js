export const LESSONS = [
  // --- AGES 5-7: The Basics ---
  {
    id: 'l1', age: '5-7', title: "Needs vs. Wants",
    desc: "Do you need water? Do you need a toy?",
    icon: '🥤', xp: 50
  },
  {
    id: 'l2', age: '5-7', title: "Coin Counting",
    desc: "Learning what a quarter is worth.",
    icon: '🪙', xp: 50
  },
  {
    id: 'l3', age: '5-7', title: "The Patience Game",
    desc: "Why waiting makes money grow.",
    icon: '⏳', xp: 50
  },

  // --- AGES 8-10: Earning & Saving ---
  {
    id: 'l4', age: '8-10', title: "The Value of Work",
    desc: "Turning chores into dollars.",
    icon: '🧹', xp: 100
  },
  {
    id: 'l5', age: '8-10', title: "Smart Spending",
    desc: "Comparison shopping 101.",
    icon: '🏷️', xp: 100
  },
  {
    id: 'l6', age: '8-10', title: "Giving Back",
    desc: "How donating helps your community.",
    icon: '❤️', xp: 100
  },

  // --- AGES 11-13: Budgeting ---
  {
    id: 'l7', age: '11-13', title: "The 50/30/20 Rule",
    desc: "How to split your money perfectly.",
    icon: '📊', xp: 150
  },
  {
    id: 'l8', age: '11-13', title: "Avoiding Debt",
    desc: "Why borrowing money costs money.",
    icon: '💳', xp: 150
  },
  {
    id: 'l9', age: '11-13', title: "Goal Setting",
    desc: "Saving for big things like a console.",
    icon: '🎯', xp: 150
  },

  // --- AGES 14-17: Investing & Taxes ---
  {
    id: 'l10', age: '14-17', title: "Compound Interest",
    desc: "Making money while you sleep.",
    icon: '🚀', xp: 200
  },
  {
    id: 'l11', age: '14-17', title: "Understanding Taxes",
    desc: "Why your paycheck is smaller than you thought.",
    icon: '🏛️', xp: 200
  },
  {
    id: 'l12', age: '14-17', title: "Stock Market 101",
    desc: "Bulls, Bears, and Risk.",
    icon: '📈', xp: 200
  },
  {
    id: 'l13', age: '14-17', title: "Credit Scores",
    desc: "Your financial report card.",
    icon: '📝', xp: 200
  }
];

export const getLessons = (ageGroup) => {
  return LESSONS.filter(l => l.age === ageGroup);
};