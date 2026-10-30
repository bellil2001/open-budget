import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@react-native-vector-icons/ionicons';

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const tabIcons = {
    Home: 'home',
    Transactions: 'swap-horizontal',
    Accounts: 'wallet',
    Settings: 'settings',
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>OB</Text>
        </View>

        <View>
          <Text style={styles.appName}>
            Open Budget
          </Text>
          <Text style={styles.subtitle}>
            Your personal finance manager
          </Text>
        </View>
      </View>

      {/* SCROLLABLE DASHBOARD */}
      <ScrollView
        style={[
          styles.content,
          activeTab !== 'Home' && styles.hidden,
        ]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* DASHBOARD TITLE */}
        <Text style={styles.label}>
          OVERVIEW
        </Text>

        <Text style={styles.title}>
          Dashboard
        </Text>

        <Text style={styles.description}>
          Welcome to your financial dashboard.
        </Text>

        {/* BALANCE CARD */}
        <View style={styles.balanceCard}>

          <Text style={styles.balanceLabel}>
            Total Balance
          </Text>

          <Text style={styles.balanceAmount}>
            0.000 TND
          </Text>

          <View style={styles.balanceDivider} />

          <View style={styles.balanceRow}>

            {/* INCOME */}
            <View>
              <Text style={styles.balanceSmallLabel}>
                ↓ Income
              </Text>

              <Text style={styles.balanceValue}>
                +0.000 TND
              </Text>
            </View>

            {/* EXPENSES */}
            <View>
              <Text style={styles.balanceSmallLabel}>
                ↑ Expenses
              </Text>

              <Text style={styles.balanceValue}>
                -0.000 TND
              </Text>
            </View>

          </View>
        </View>

        {/* RECENT TRANSACTIONS */}
        <View style={styles.transactionsSection}>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Recent Transactions
            </Text>

            <Text style={styles.seeAll}>
              See all
            </Text>
          </View>

          <View style={styles.emptyCard}>

            <View style={styles.emptyIcon}>
              <Text style={styles.emptyIconText}>
                ↔
              </Text>
            </View>

            <Text style={styles.emptyTitle}>
              No transactions yet
            </Text>

            <Text style={styles.emptyDescription}>
              Your income and expenses will appear here
              once you add your first transaction.
            </Text>

          </View>
        </View>

      </ScrollView>

      
      {/* OTHER SCREENS */}
      {activeTab !== 'Home' && (
        <View style={styles.placeholderScreen}>
          <Text style={styles.title}>
            {activeTab}
          </Text>

          <Text style={styles.description}>
            We will build the {activeTab.toLowerCase()} screen next.
          </Text>
        </View>
      )}

      {/* BOTTOM NAVIGATION */}
      <View style={styles.bottomNav}>
        {['Home', 'Transactions', 'Accounts', 'Settings'].map((tab) => (
          <Pressable
            key={tab}
            style={styles.navItem}
            onPress={() => setActiveTab(tab)}
            accessibilityRole="button"
            accessibilityLabel={`Open ${tab}`}
          >
            <Ionicons
              name={tabIcons[tab]}
              size={23}
              color={
                activeTab === tab
                  ? '#176B4D'
                  : '#6B7280'
              }
            />

            <Text
              style={[
                activeTab === tab
                  ? styles.activeNavText
                  : styles.navText,
                { marginTop: 6 },
              ]}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>


      


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7F6',
    paddingTop: 35,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },

  logo: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#176B4D',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  logoText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  appName: {
    color: '#111827',
    fontSize: 20,
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#6B7280',
    fontSize: 12,
    marginTop: 4,
  },

  content: {
    flex: 1,
  },

  scrollContent: {
    padding: 24,
    paddingBottom: 60,
  },

  label: {
    color: '#176B4D',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
  },

  title: {
    color: '#111827',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 8,
  },

  description: {
    color: '#6B7280',
    fontSize: 14,
    marginTop: 10,
  },

  balanceCard: {
    backgroundColor: '#176B4D',
    borderRadius: 22,
    padding: 24,
    marginTop: 30,
  },

  balanceLabel: {
    color: '#D1EBDC',
    fontSize: 14,
    fontWeight: '500',
  },

  balanceAmount: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 24,
  },

  balanceDivider: {
    height: 1,
    backgroundColor: '#408368',
    marginBottom: 20,
  },

  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  balanceSmallLabel: {
    color: '#D1EBDC',
    fontSize: 12,
    marginBottom: 8,
  },

  balanceValue: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  transactionsSection: {
    marginTop: 32,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#111827',
  },

  seeAll: {
    color: '#176B4D',
    fontSize: 13,
    fontWeight: '600',
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 26,
    alignItems: 'center',
  },

  emptyIcon: {
    backgroundColor: '#E7F3EC',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },

  emptyIconText: {
    fontSize: 28,
    color: '#176B4D',
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },

  emptyDescription: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 21,
    textAlign: 'center',
  },

  emptyDescription: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 21,
    textAlign: 'center',
  },

  
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 18,
    paddingBottom: 20,
    paddingHorizontal: 8,
  },

  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  navText: {
    color: '#6B7280',
    fontSize: 11,
    fontWeight: '500',
  },

  activeNavText: {
    color: '#176B4D',
    fontSize: 11,
    fontWeight: 'bold',
  },

  
  hidden: {
    display: 'none',
  },

  placeholderScreen: {
    flex: 1,
    padding: 24,
  },



});
