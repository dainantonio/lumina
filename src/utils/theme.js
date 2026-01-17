// filename: src/utils/theme.js

export const getTheme = (ageGroup) => {
  switch (ageGroup) {
    case '5-7':
      return {
        id: 'candy',
        bg: '#FFF0F5', // Lavender Blush
        cardBg: '#FFFFFF',
        primary: '#FF6B6B', // Pastel Red
        secondary: '#4ECDC4', // Teal
        accent: '#FFE66D', // Yellow
        text: '#2D3436',
        jarColors: ['#FF9FF3', '#FECA57', '#54A0FF', '#5F27CD'],
        vibe: '🍭 Candy Shop'
      };
    case '8-10':
      return {
        id: 'adventure',
        bg: '#EDF7F6',
        cardBg: '#FFFFFF',
        primary: '#26A69A', // Jungle Green
        secondary: '#FF8A65', // Orange
        accent: '#5C6BC0', // Indigo
        text: '#263238',
        jarColors: ['#66BB6A', '#FFA726', '#29B6F6', '#AB47BC'],
        vibe: '🗺️ Explorer'
      };
    case '11-13':
      return {
        id: 'cyber',
        bg: '#1e272e', // Dark Gray
        cardBg: '#2f3542',
        primary: '#00d2d3', // Neon Cyan
        secondary: '#ff9f43', // Neon Orange
        accent: '#5f27cd', // Neon Purple
        text: '#ffffff', // White text for dark mode
        jarColors: ['#ff9f43', '#00d2d3', '#5f27cd', '#ff6b6b'],
        vibe: '🕹️ Cyber Arcade'
      };
    case '14-17':
      return {
        id: 'pro',
        bg: '#000000', // Pure Black
        cardBg: '#1C1C1E', // Dark Grey
        primary: '#FDCB6E', // Gold
        secondary: '#74B9FF', // Soft Blue
        accent: '#636E72', // Grey
        text: '#ffffff',
        jarColors: ['#FDCB6E', '#0984E3', '#00b894', '#e17055'],
        vibe: '💼 Future CEO'
      };
    default:
      // Default / Fallback
      return {
        id: 'standard',
        bg: '#F8F9FE',
        cardBg: '#FFFFFF',
        primary: '#6C5CE7',
        secondary: '#0984E3',
        accent: '#00b894',
        text: '#2D3436',
        jarColors: ['#FF7675', '#4ECDC4', '#FFE66D', '#FF9F43'],
        vibe: '🚀 Standard'
      };
  }
};