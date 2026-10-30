
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';

export default function RecentTransactions() {
  return (
    <View style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
  container: {
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
    color: colors.text,
  },

  seeAll: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },

  emptyCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 26,
    alignItems: 'center',
  },

  emptyIcon: {
    backgroundColor: colors.primaryLight,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },

  emptyIconText: {
    fontSize: 28,
    color: colors.primary,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },

  emptyDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 21,
    textAlign: 'center',
  },
});
