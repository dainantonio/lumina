// filename: src/context/MoneyContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTheme } from '../utils/theme';

export const MoneyContext = createContext();

export const MoneyProvider = ({ children }) => {
  const defaultWallet = { spend: 0, save: 0, grow: 0, give: 0 };
  const defaultStats = { generosity: 0, wisdom: 0, discipline: 0, xp: 0, level: 1 };
  
  const [userProfile, setUserProfile] = useState(null);
  const [wallet, setWallet] = useState(defaultWallet);
  const [stats, setStats] = useState(defaultStats);
  const [history, setHistory] = useState([]); 
  const [completedLessons, setCompletedLessons] = useState([]);
  const [theme, setTheme] = useState(getTheme('default'));
  const [loading, setLoading] = useState(true);
  const [riskLevel, setRiskLevel] = useState('medium'); 

  useEffect(() => { loadData(); }, []);
  useEffect(() => {
    if (userProfile) setTheme(getTheme(userProfile.ageGroup));
  }, [userProfile]);
  
  useEffect(() => { 
    if (!loading && userProfile) saveData(); 
  }, [wallet, stats, userProfile, history, completedLessons, riskLevel]);

  const loadData = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem('lumina_profile');
      const savedWallet = await AsyncStorage.getItem('lumina_wallet');
      const savedStats = await AsyncStorage.getItem('lumina_stats');
      const savedHistory = await AsyncStorage.getItem('lumina_history');
      const savedLessons = await AsyncStorage.getItem('lumina_lessons');
      const savedRisk = await AsyncStorage.getItem('lumina_risk');
      
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        setUserProfile(parsed);
        setTheme(getTheme(parsed.ageGroup));
      }
      if (savedWallet) setWallet(JSON.parse(savedWallet));
      if (savedStats) setStats(JSON.parse(savedStats));
      if (savedHistory) setHistory(JSON.parse(savedHistory));
      if (savedLessons) setCompletedLessons(JSON.parse(savedLessons));
      if (savedRisk) setRiskLevel(savedRisk);

    } catch (e) { console.error("Load Error", e); } 
    finally { setLoading(false); }
  };

  const saveData = async () => {
    try {
      if (userProfile) await AsyncStorage.setItem('lumina_profile', JSON.stringify(userProfile));
      await AsyncStorage.setItem('lumina_wallet', JSON.stringify(wallet));
      await AsyncStorage.setItem('lumina_stats', JSON.stringify(stats));
      await AsyncStorage.setItem('lumina_history', JSON.stringify(history));
      await AsyncStorage.setItem('lumina_lessons', JSON.stringify(completedLessons));
      await AsyncStorage.setItem('lumina_risk', riskLevel);
    } catch (e) { console.error("Save Error"); }
  };

  // --- ACTIONS ---

  const addTransaction = (title, amount, type) => {
    const newTx = { id: Date.now(), title, amount, type, date: new Date().toLocaleDateString() };
    setHistory(prev => [newTx, ...prev].slice(0, 50));
  };

  const login = (name, ageGroup, avatarId) => {
    setUserProfile({ name, ageGroup, avatarId });
    setTheme(getTheme(ageGroup));
    let startingCash = ageGroup === '14-17' ? 100 : ageGroup === '11-13' ? 50 : 20;
    setWallet({ ...defaultWallet, save: startingCash });
    setCompletedLessons([]);
    addTransaction("Initial Deposit", startingCash, 'earn');
  };

  const logout = async () => {
    setUserProfile(null);
    setWallet(defaultWallet);
    setStats(defaultStats);
    setHistory([]);
    setCompletedLessons([]);
    setTheme(getTheme('default'));
    await AsyncStorage.clear();
  };

  const addIncome = (allocations) => {
    let totalIncome = allocations.spend + allocations.save + allocations.grow + allocations.give;
    
    // AGE FEATURE: TAXES (Ages 14-17)
    if (userProfile?.ageGroup === '14-17') {
      const taxRate = 0.15; 
      const taxAmount = totalIncome * taxRate;
      const afterTax = totalIncome - taxAmount;
      const ratio = afterTax / totalIncome;
      
      setWallet(prev => ({
        spend: prev.spend + (allocations.spend * ratio),
        save: prev.save + (allocations.save * ratio),
        grow: prev.grow + (allocations.grow * ratio),
        give: prev.give + (allocations.give * ratio),
      }));

      addTransaction("Payday (Gross)", totalIncome, 'earn');
      addTransaction("Income Tax (15%)", -taxAmount, 'spend');
    } else {
      setWallet(prev => ({
        spend: prev.spend + allocations.spend,
        save: prev.save + allocations.save,
        grow: prev.grow + allocations.grow,
        give: prev.give + allocations.give,
      }));
      addTransaction("Payday", totalIncome, 'earn');
    }
    
    setStats(prev => checkLevelUp({ ...prev, discipline: prev.discipline + 10 }));
  };

  const completeQuest = (quest) => {
    setWallet(prev => ({ ...prev, spend: prev.spend + quest.reward }));
    setStats(prev => checkLevelUp({ ...prev, discipline: prev.discipline + 5, xp: prev.xp + 20 }));
    addTransaction(`Quest: ${quest.title}`, quest.reward, 'earn');
    return true;
  };

  const completeLesson = (lesson) => {
    if (completedLessons.includes(lesson.id)) return;
    setCompletedLessons(prev => [...prev, lesson.id]);
    setStats(prev => checkLevelUp({ ...prev, wisdom: prev.wisdom + 20, xp: prev.xp + lesson.xp }));
    return true;
  };

  const makeDecision = (cost, category, statImpact) => {
    if (wallet[category] >= cost) {
      setWallet(prev => ({ ...prev, [category]: prev[category] - cost }));
      setStats(prev => checkLevelUp({
        ...prev,
        generosity: prev.generosity + (statImpact.generosity || 0),
        discipline: prev.discipline + (statImpact.discipline || 0),
        wisdom: prev.wisdom + (statImpact.wisdom || 0)
      }));
      if (cost > 0) addTransaction("Purchase", -cost, 'spend');
      return true;
    }
    return false;
  };

  const checkLevelUp = (currentStats) => {
    const newXP = currentStats.generosity + currentStats.wisdom + currentStats.discipline;
    const newLevel = Math.floor(newXP / 50) + 1;
    return { ...currentStats, xp: newXP, level: newLevel };
  };

  const calculateFutureValue = (years) => {
    let rate = 0.05; 
    if (riskLevel === 'low') rate = 0.03; 
    if (riskLevel === 'medium') rate = 0.08; 
    if (riskLevel === 'high') rate = 0.12; 
    if (userProfile?.ageGroup === '5-7' || userProfile?.ageGroup === '8-10') rate = 0.10; 

    return (wallet.grow * Math.pow((1 + rate), years)).toFixed(0);
  };

  return (
    <MoneyContext.Provider value={{ 
      wallet, stats, userProfile, loading, theme, history, completedLessons, riskLevel,
      login, logout, addIncome, makeDecision, calculateFutureValue, completeQuest, completeLesson, setRiskLevel
    }}>
      {children}
    </MoneyContext.Provider>
  );
};