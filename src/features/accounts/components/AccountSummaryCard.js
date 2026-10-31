
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { colors } from '../../../theme/colors';

export default function AccountSummaryCard({
  totalBalance = 0,
  accountCount = 0,
}) {
  const formattedBalance =
    Number(totalBalance).toFixed(3) + ' TND';

  return (
    <View style={styles.card}>
      <Text style={styles.label}>
        Total across accounts
      </Text>

      <Text style={styles.balance}>
        {formattedBalance}
      </Text>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.smallLabel}>
          Total accounts
        </Text>

        <Text style={styles.count}>
          {accountCount} {accountCount === 1
            ? 'account'
            : 'accounts'}
        </Text>
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

  balance: {
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  smallLabel: {
    color: colors.balanceText,
    fontSize: 13,
  },

  count: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
