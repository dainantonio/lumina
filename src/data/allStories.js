// filename: src/data/allStories.js

// Age Groups: '5-7', '8-10', '11-13', '14-17'

export const storyDatabase = [
  // --- AGES 5-7: Little Learners (Concept: Patience & Choices) ---
  {
    id: 101, age: '5-7', title: "The Marshmallow Test 🍬",
    story: "You have one marshmallow. If you wait 10 minutes without eating it, you get two!",
    optionA: { text: "Eat Now (1 Marshmallow)", cost: 0, category: 'spend', impact: { discipline: -5, joy: 5 } },
    optionB: { text: "Wait (2 Marshmallows)", cost: 0, category: 'save', impact: { discipline: 10, joy: 10 } }
  },
  {
    id: 102, age: '5-7', title: "Toy Store Tantrum 🧸",
    story: "You want a toy car ($5). You only have $2. Do you cry or save up?",
    optionA: { text: "Cry / Ask Mom", cost: 0, category: 'spend', impact: { discipline: -5, wisdom: -2 } },
    optionB: { text: "Save Allowance", cost: 0, category: 'save', impact: { discipline: 10, wisdom: 5 } }
  },
  {
    id: 103, age: '5-7', title: "Sharing Toys 🤝",
    story: "Your friend wants to play with your new ball. Do you share?",
    optionA: { text: "Keep it to myself", cost: 0, category: 'save', impact: { generosity: -5, wisdom: -2 } },
    optionB: { text: "Share with friend", cost: 0, category: 'give', impact: { generosity: 10, wisdom: 5 } }
  },
  {
    id: 104, age: '5-7', title: "Found a Quarter 🪙",
    story: "You found a shiny quarter on the sidewalk!",
    optionA: { text: "Buy Gum immediately", cost: 0, category: 'spend', impact: { discipline: -2 } },
    optionB: { text: "Put in Piggy Bank", cost: 0, category: 'save', impact: { discipline: 5, wisdom: 2 } }
  },
  {
    id: 105, age: '5-7', title: "Lemonade Stand 🍋",
    story: "It's hot! Do you want to make lemonade to sell?",
    optionA: { text: "No, just play", cost: 0, category: 'spend', impact: { discipline: 0 } },
    optionB: { text: "Work hard & Sell", cost: 0, category: 'grow', impact: { discipline: 10, wisdom: 5 } }
  },

  // --- AGES 8-10: Money Explorers (Concept: Work & Value) ---
  {
    id: 201, age: '8-10', title: "The Video Game Skin 🎮",
    story: "A cool new outfit for your game character costs $10. It doesn't make you stronger, just look cool.",
    optionA: { text: "Buy Skin (-$10)", cost: 10, category: 'spend', impact: { wisdom: -5, joy: 5 } },
    optionB: { text: "Keep Playing Free", cost: 0, category: 'save', impact: { wisdom: 10, discipline: 5 } }
  },
  {
    id: 202, age: '8-10', title: "Lost Library Book 📚",
    story: "You lost a library book. The fine is $5. Do you pay it or hide?",
    optionA: { text: "Pay the Fine (-$5)", cost: 5, category: 'spend', impact: { wisdom: 10, discipline: 10 } },
    optionB: { text: "Hide it", cost: 0, category: 'save', impact: { wisdom: -10, discipline: -10 } }
  },
  {
    id: 203, age: '8-10', title: "Extra Chores 🧹",
    story: "Mom offers $5 if you clean the garage. It takes all Saturday morning.",
    optionA: { text: "Sleep in", cost: 0, category: 'spend', impact: { discipline: -5 } },
    optionB: { text: "Do the work", cost: 0, category: 'grow', impact: { discipline: 15, wisdom: 5 } }
  },
  {
    id: 204, age: '8-10', title: "Friend's Birthday 🎁",
    story: "Best friend's party! Buy a gift ($15) or make a friendship bracelet ($2)?",
    optionA: { text: "Buy Gift (-$15)", cost: 15, category: 'spend', impact: { generosity: 10, wisdom: 0 } },
    optionB: { text: "Make Bracelet (-$2)", cost: 2, category: 'save', impact: { generosity: 15, wisdom: 10 } }
  },
  {
    id: 205, age: '8-10', title: "The Candy Sale 🍫",
    story: "School is selling candy bars for charity. Do you buy one for yourself?",
    optionA: { text: "Buy & Eat (-$2)", cost: 2, category: 'spend', impact: { generosity: 5, discipline: -2 } },
    optionB: { text: "Don't buy", cost: 0, category: 'save', impact: { discipline: 5 } }
  },

  // --- AGES 11-13: Smart Savers (Concept: Goals & Social Pressure) ---
  {
    id: 301, age: '11-13', title: "Brand Name Hoodies 🧥",
    story: "Everyone is wearing the $60 hoodie. The generic one is $20 and feels the same.",
    optionA: { text: "Buy Brand (-$60)", cost: 60, category: 'spend', impact: { wisdom: -10, joy: 5 } },
    optionB: { text: "Buy Generic (-$20)", cost: 20, category: 'save', impact: { wisdom: 20, discipline: 10 } }
  },
  {
    id: 302, age: '11-13', title: "Streaming Service 📺",
    story: "You want a new streaming sub ($10/mo). Do you cancel your old one first?",
    optionA: { text: "Keep Both", cost: 10, category: 'spend', impact: { wisdom: -5, discipline: -5 } },
    optionB: { text: "Swap (Cancel Old)", cost: 10, category: 'save', impact: { wisdom: 10, discipline: 10 } }
  },
  {
    id: 303, age: '11-13', title: "Pizza with Friends 🍕",
    story: "Friends are going for pizza. You're broke. Do you borrow money?",
    optionA: { text: "Borrow Money", cost: 0, category: 'spend', impact: { wisdom: -10, discipline: -10 } },
    optionB: { text: "Eat at home", cost: 0, category: 'save', impact: { discipline: 15, wisdom: 5 } }
  },
  {
    id: 304, age: '11-13', title: "The Sale Trap 🏷️",
    story: "A game is 50% off! It's $30 (normally $60). But you didn't want it before.",
    optionA: { text: "Buy it! It's a deal!", cost: 30, category: 'spend', impact: { wisdom: -15, discipline: -5 } },
    optionB: { text: "Skip it", cost: 0, category: 'save', impact: { wisdom: 15, discipline: 10 } }
  },

  // --- AGES 14-17: Future Investors (Concept: Risk, Ethics, Jobs) ---
  {
    id: 401, age: '14-17', title: "First Paycheck 💸",
    story: "You got your first paycheck of $200! What do you do first?",
    optionA: { text: "Blow it on clothes", cost: 200, category: 'spend', impact: { wisdom: -20, discipline: -20 } },
    optionB: { text: "Invest 50%", cost: 100, category: 'grow', impact: { wisdom: 25, discipline: 20 } }
  },
  {
    id: 402, age: '14-17', title: "Crypto Hype 🚀",
    story: "Your friend says a new coin is going to the moon. Do you put $50 in?",
    optionA: { text: "YOLO! (-$50)", cost: 50, category: 'grow', impact: { wisdom: -10, discipline: -10 } },
    optionB: { text: "Research first", cost: 0, category: 'save', impact: { wisdom: 20, discipline: 10 } }
  },
  {
    id: 403, age: '14-17', title: "Car Trouble 🚗",
    story: "Your car needs a $100 repair. Do you dip into your emergency fund?",
    optionA: { text: "Use Emergency Fund", cost: 100, category: 'save', impact: { wisdom: 20, discipline: 20 } },
    optionB: { text: "Use Credit Card", cost: 0, category: 'spend', impact: { wisdom: -20, discipline: -5 } }
  },
  {
    id: 404, age: '14-17', title: "College Textbooks 📖",
    story: "Textbooks cost $300 new. Used ones are $100 but might have writing.",
    optionA: { text: "Buy New (-$300)", cost: 300, category: 'spend', impact: { wisdom: -10 } },
    optionB: { text: "Buy Used (-$100)", cost: 100, category: 'save', impact: { wisdom: 20 } }
  },
  {
    id: 405, age: '14-17', title: "Coffee Habit ☕",
    story: "Daily latte is $6. That's $180/month.",
    optionA: { text: "Keep buying", cost: 6, category: 'spend', impact: { wisdom: -5 } },
    optionB: { text: "Brew at home", cost: 1, category: 'save', impact: { wisdom: 10, discipline: 15 } }
  }
];