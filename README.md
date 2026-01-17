# Lumina: Kids Financial Literacy App 🚀

**Tagline:** Money Mindset, Not Just Math.

## 📱 What is this?
Lumina is a "Flight Simulator for Wealth." Instead of just tracking allowance, it teaches kids:
- **Compound Interest:** Via the "Time Machine" feature.
- **Ethics:** Via the "Daily Dilemma" story engine.
- **Budgeting:** Via the "Payday" allocation system.
- **Progression:** Via an RPG-style leveling system (Level 1 -> Level 100).

## 🛠️ Tech Stack
- **Framework:** React Native (Expo)
- **Language:** JavaScript
- **Storage:** Async Storage (Local, COPPA Compliant)
- **Navigation:** React Navigation (Bottom Tabs)

## ⚡ How to Run
1. Open the Terminal.
2. Run `npm install` (only needed the first time).
3. Run `npx expo start --tunnel`.
4. Scan the QR code with your phone (using Expo Go app).
5. OR press `w` to run in the Web Browser.

## 📂 Project Structure
- `src/context/MoneyContext.js` -> **The Brain.** Handles math, saving, and leveling up.
- `src/screens/*` -> **The Visuals.** All the screens (Dashboard, Time Machine, etc).
- `src/data/stories.js` -> **The Content.** The database of ethical dilemmas.

## 🔒 Security
This app is designed to be **COPPA Compliant**.
- No PII (Personally Identifiable Information) is collected.
- All data is stored locally on the device.
- Critical actions (Reset Game) are protected by a Math Challenge Parent Gate.

---
*Built with Vibe Coding.*