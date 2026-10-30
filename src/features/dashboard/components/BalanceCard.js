
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';

export default function BalanceCard({
  balance = 0,
  income = 0,
  expenses = 0,
}) {
  const formatMoney = (amount) => {
    return Number(amount).toFixed(3) + ' TND';
  };

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Total Balance</Text>

      <Text style={styles.amount}>
        {formatMoney(balance)}
      </Text>

      <View style={styles.divider} />

      <View style={styles.row}>
        <View>
          <Text style={styles.smallLabel}>
            ↓ Income
          </Text>
          <Text style={styles.value}>
            +{formatMoney(income)}
          </Text>
        </View>

        <View>
          <Text style={styles.smallLabel}>
            ↑ Expenses
          </Text>
          <Text style={styles.value}>
            -{formatMoney(expenses)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    borderRadius: 22,
    padding: 24,
    marginTop: 30,
  },

  label: {
    color: colors.balanceText,
    fontSize: 14,
    fontWeight: '500',
  },

  amount: {
    color: colors.surface,
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 24,
  },

  divider: {
    height: 1,
    backgroundColor: colors.balanceDivider,
    marginBottom: 20,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  smallLabel: {
    color: colors.balanceText,
    fontSize: 12,
    marginBottom: 8,
  },

  value: {
    color: colors.surface,
    fontSize: 15,
    fontWeight: 'bold',
  },
});
