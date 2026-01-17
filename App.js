// filename: App.js
import React, { useContext } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MoneyProvider, MoneyContext } from './src/context/MoneyContext';
import Dashboard from './src/screens/Dashboard';
import TimeMachine from './src/screens/TimeMachine';
import Learn from './src/screens/Learn';
import Payday from './src/screens/Payday';
import Profile from './src/screens/Profile';
import Onboarding from './src/screens/Onboarding';
import { LucideHome, LucideRocket, LucideBookOpen, LucideWallet, LucideUserCircle } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

function MainStack() {
  const { theme } = useContext(MoneyContext);
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { 
          borderTopWidth: 0, elevation: 0, height: 80, paddingBottom: 25, paddingTop: 10,
          backgroundColor: theme.cardBg, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10,
        },
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') return <LucideHome size={size} color={color} />;
          if (route.name === 'Earn') return <LucideWallet size={size} color={color} />;
          if (route.name === 'Learn') return <LucideBookOpen size={size} color={color} />;
          if (route.name === 'Time') return <LucideRocket size={size} color={color} />;
          if (route.name === 'You') return <LucideUserCircle size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.primary, tabBarInactiveTintColor: '#B2BEC3',
        tabBarLabelStyle: { fontWeight: '600', fontSize: 10 }
      })}
    >
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="Earn" component={Payday} />
      <Tab.Screen name="Learn" component={Learn} />
      <Tab.Screen name="Time" component={TimeMachine} />
      <Tab.Screen name="You" component={Profile} />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  const { userProfile, loading } = useContext(MoneyContext);
  if (loading) return <View style={{flex:1, backgroundColor:'#F8F9FE'}} />;
  return (
    <NavigationContainer>
      {userProfile ? <MainStack /> : <Onboarding />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <MoneyProvider>
      <RootNavigator />
    </MoneyProvider>
  );
}