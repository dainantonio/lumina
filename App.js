// filename: App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MoneyProvider } from './src/context/MoneyContext';
import Dashboard from './src/screens/Dashboard';
import TimeMachine from './src/screens/TimeMachine';
import Dilemma from './src/screens/Dilemma';
import Payday from './src/screens/Payday';
import Profile from './src/screens/Profile'; // Import Profile
import { LucideHome, LucideRocket, LucideZap, LucideWallet, LucideUserCircle } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <MoneyProvider>
      <NavigationContainer>
        <Tab.Navigator 
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: { 
              borderTopWidth: 0, 
              elevation: 0, 
              height: 60, 
              paddingBottom: 10,
              paddingTop: 10,
              backgroundColor: '#fff'
            },
            tabBarIcon: ({ color, size }) => {
              if (route.name === 'Home') return <LucideHome size={size} color={color} />;
              if (route.name === 'Earn') return <LucideWallet size={size} color={color} />;
              if (route.name === 'Dilemma') return <LucideZap size={size} color={color} />;
              if (route.name === 'Time') return <LucideRocket size={size} color={color} />;
              if (route.name === 'You') return <LucideUserCircle size={size} color={color} />;
            },
            tabBarActiveTintColor: '#6C5CE7',
            tabBarInactiveTintColor: '#B2BEC3',
          })}
        >
          <Tab.Screen name="Home" component={Dashboard} />
          <Tab.Screen name="Earn" component={Payday} />
          <Tab.Screen name="Dilemma" component={Dilemma} />
          <Tab.Screen name="Time" component={TimeMachine} />
          <Tab.Screen name="You" component={Profile} />
        </Tab.Navigator>
      </NavigationContainer>
    </MoneyProvider>
  );
}