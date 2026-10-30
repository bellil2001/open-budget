
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { colors } from '../theme/colors';

export default function AppHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>
          OB
        </Text>
      </View>

      <View style={styles.brand}>
        <Text style={styles.appName}>
          Open Budget
        </Text>

        <Text style={styles.subtitle}>
          Your personal finance manager
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: colors.surface,
  },

  logo: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  logoText: {
    color: colors.surface,
    fontSize: 18,
    fontWeight: 'bold',
  },

  brand: {
    flex: 1,
  },

  appName: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },

  subtitle: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
});
