
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';

import { colors } from '../../../theme/colors';

const accountTypes = {
  cash: {
    label: 'Cash account',
    icon: 'wallet-outline',
  },
  bank: {
    label: 'Bank account',
    icon: 'business-outline',
  },
  savings: {
    label: 'Savings account',
    icon: 'save-outline',
  },
};

export default function AccountCard({
  name,
  type = 'cash',
  balanceMillimes = 0,
}) {
  const accountType =
    accountTypes[type] || accountTypes.cash;

  const amount = (
    balanceMillimes / 1000
  ).toLocaleString('en-US', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });

  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Ionicons
          name={accountType.icon}
          size={23}
          color={colors.primary}
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>

        <Text style={styles.type}>
          {accountType.label}
        </Text>
      </View>

      <View style={styles.balanceBox}>
        <Text style={styles.balance}>
          {amount}
        </Text>

        <Text style={styles.currency}>
          TND
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 12,
  },

  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  info: {
    flex: 1,
    marginRight: 8,
  },

  name: {
    color: colors.text,
    fontSize: 15,
    fontWeight: 'bold',
  },

  type: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },

  balanceBox: {
    alignItems: 'flex-end',
    flexShrink: 1,
  },

  balance: {
    color: colors.text,
    fontSize: 15,
    fontWeight: 'bold',
  },

  currency: {
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: 4,
  },
});
