// filename: src/data/stories.js
export const stories = [
  {
    id: 1,
    title: "The Stray Dog 🐕",
    story: "You see a hungry stray dog outside the grocery store. Dog food costs $5.00. Do you help?",
    optionA: { text: "Buy Food (-$5.00)", cost: 5, category: 'spend', impact: { generosity: 10, wisdom: 0 } },
    optionB: { text: "Walk Away", cost: 0, category: 'save', impact: { generosity: -2, wisdom: 2 } }
  },
  {
    id: 2,
    title: "The New Sneaker Drop 👟",
    story: "Everyone at school is talking about the new 'Rocket' sneakers. They cost $20. You have the money, but do you need them?",
    optionA: { text: "Buy Them (-$20.00)", cost: 20, category: 'spend', impact: { generosity: 0, wisdom: -5 } },
    optionB: { text: "Invest Instead", cost: 0, category: 'grow', impact: { generosity: 0, wisdom: 15 } }
  },
  {
    id: 3,
    title: "Grandma's Birthday 🎂",
    story: "It's grandma's birthday! Do you make her a card (free) or buy her a fancy gift ($15)?",
    optionA: { text: "Buy Gift (-$15.00)", cost: 15, category: 'spend', impact: { generosity: 15, wisdom: 0 } },
    optionB: { text: "Make Card (Time)", cost: 0, category: 'save', impact: { generosity: 10, wisdom: 5 } }
  },
  {
    id: 4,
    title: "The Glitch 👾",
    story: "The vending machine glitches and gives you two candy bars instead of one. No one saw.",
    optionA: { text: "Keep Both", cost: 0, category: 'save', impact: { generosity: -5, wisdom: -5 } },
    optionB: { text: "Return One", cost: 0, category: 'give', impact: { generosity: 20, wisdom: 10 } }
  },
  {
    id: 5,
    title: "Broken Window 🪟",
    story: "You accidentally kicked a ball through the neighbor's window. It costs $25 to fix.",
    optionA: { text: "Pay for it (-$25)", cost: 25, category: 'spend', impact: { generosity: 5, wisdom: 20 } },
    optionB: { text: "Run Away", cost: 0, category: 'save', impact: { generosity: -20, wisdom: -10 } }
  }
];