
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { colors } from '../../theme/colors';

import BalanceCard from './components/BalanceCard';
import RecentTransactions from './components/RecentTransactions';

export default function DashboardScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* DASHBOARD HEADER */}
      <View style={styles.heading}>
        <Text style={styles.label}>
          OVERVIEW
        </Text>

        <Text style={styles.title}>
          Dashboard
        </Text>

        <Text style={styles.description}>
          Welcome to your financial dashboard.
        </Text>
      </View>

      {/* FINANCIAL SUMMARY */}
      <BalanceCard
        balance={0}
        income={0}
        expenses={0}
      />

      {/* RECENT TRANSACTIONS */}
      <RecentTransactions />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: 24,
    paddingBottom: 60,
  },

  heading: {
    marginBottom: 0,
  },

  label: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
  },

  title: {
    color: colors.text,
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 8,
  },

  description: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 10,
  },
});
