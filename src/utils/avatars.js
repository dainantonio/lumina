// filename: src/utils/avatars.js
export const AVATARS = [
  { 
    id: 'bunny', 
    name: 'Bella', 
    emoji: '🐰', 
    bg: '#fab1a0', 
    desc: 'Bounces with joy!' 
  },
  { 
    id: 'fox', 
    name: 'Finley', 
    emoji: '🦊', 
    bg: '#ffb8b8', 
    desc: 'Smart & tricky.' 
  },
  { 
    id: 'lion', 
    name: 'Leo', 
    emoji: '🦁', 
    bg: '#ffeaa7', 
    desc: 'Brave leader.' 
  },
  { 
    id: 'panda', 
    name: 'Pipsqueak', 
    emoji: '🐼', 
    bg: '#55efc4', 
    desc: 'Chill & wise.' 
  }
];

export const getAvatar = (id) => AVATARS.find(a => a.id === id) || AVATARS[0];