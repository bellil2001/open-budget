
import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  BackHandler,
} from 'react-native';

import { useEffect } from 'react';

import AppHeader from '../components/AppHeader';
import DashboardScreen from '../features/dashboard/DashboardScreen';
import AccountsScreen from '../features/accounts/AccountsScreen';
import BottomNavigation from './BottomNavigation';

import { colors } from '../theme/colors';

export default function AppNavigator() {
  const [activeTab, setActiveTab] = useState('Home');

  // Handle the Android back button
  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (activeTab !== 'Home') {
          setActiveTab('Home');
          return true;
        }

        return false;
      }
    );

    return () => subscription.remove();
  }, [activeTab]);

  return (
    <View style={styles.container}>

      {/* APPLICATION HEADER */}
      <AppHeader />

      {/* SCREEN CONTENT */}
      {activeTab === 'Home' ? (
        <DashboardScreen />
      ) : activeTab === 'Accounts' ? (
        <AccountsScreen />
      ) : (
        <View style={styles.placeholderScreen}>
          <Text style={styles.title}>
            {activeTab}
          </Text>

          <Text style={styles.description}>
            We will build the {activeTab.toLowerCase()}
            screen next.
          </Text>
        </View>
      )}

      {/* BOTTOM NAVIGATION */}
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  placeholderScreen: {
    flex: 1,
    padding: 24,
  },

  title: {
    color: colors.text,
    fontSize: 32,
    fontWeight: 'bold',
  },

  description: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 10,
  },
});
