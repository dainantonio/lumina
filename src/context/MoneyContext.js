// filename: src/context/MoneyContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const MoneyContext = createContext();

export const MoneyProvider = ({ children }) => {
  const defaultWallet = { spend: 20.00, save: 10.00, grow: 50.00, give: 5.00 };
  const defaultStats = { generosity: 0, wisdom: 0, discipline: 0, xp: 0, level: 1 };

  const [wallet, setWallet] = useState(defaultWallet);
  const [stats, setStats] = useState(defaultStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadData(); }, []);
  
  useEffect(() => { 
    if (!loading) saveData(); 
  }, [wallet, stats]);

  const loadData = async () => {
    try {
      const savedWallet = await AsyncStorage.getItem('lumina_wallet');
      const savedStats = await AsyncStorage.getItem('lumina_stats');
      if (savedWallet) setWallet(JSON.parse(savedWallet));
      if (savedStats) setStats(JSON.parse(savedStats));
    } catch (e) { console.error("Load Error"); } 
    finally { setLoading(false); }
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('lumina_wallet', JSON.stringify(wallet));
      await AsyncStorage.setItem('lumina_stats', JSON.stringify(stats));
    } catch (e) { console.error("Save Error"); }
  };

  const calculateFutureValue = (years) => {
    const rate = 0.08; 
    return (wallet.grow * Math.pow((1 + rate), years)).toFixed(0);
  };

  const checkLevelUp = (currentStats) => {
    const newXP = currentStats.generosity + currentStats.wisdom + currentStats.discipline;
    const newLevel = Math.floor(newXP / 50) + 1;
    return { ...currentStats, xp: newXP, level: newLevel };
  };

  // --- NEW FUNCTION: PAYDAY ---
  const addIncome = (allocations) => {
    setWallet(prev => ({
      spend: prev.spend + allocations.spend,
      save: prev.save + allocations.save,
      grow: prev.grow + allocations.grow,
      give: prev.give + allocations.give,
    }));
    
    // Bonus XP for allocating correctly
    setStats(prev => checkLevelUp({
      ...prev,
      discipline: prev.discipline + 10
    }));
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
      return true;
    }
    return false;
  };

  const resetGame = async () => {
    setWallet(defaultWallet);
    setStats(defaultStats);
    await AsyncStorage.clear();
  };

  return (
    <MoneyContext.Provider value={{ wallet, stats, calculateFutureValue, makeDecision, addIncome, resetGame, loading }}>
      {children}
    </MoneyContext.Provider>
  );
};