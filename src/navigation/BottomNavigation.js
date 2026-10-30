
import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

import { Ionicons } from '@react-native-vector-icons/ionicons';

import { colors } from '../theme/colors';

const tabs = [
  { name: 'Home', icon: 'home' },
  { name: 'Transactions', icon: 'swap-horizontal' },
  { name: 'Accounts', icon: 'wallet' },
  { name: 'Settings', icon: 'settings' },
];

export default function BottomNavigation({
  activeTab,
  onTabChange,
}) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.name;

        return (
          <Pressable
            key={tab.name}
            style={styles.tab}
            onPress={() => onTabChange(tab.name)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={tab.name}
          >
            <Ionicons
              name={tab.icon}
              size={23}
              color={
                isActive
                  ? colors.primary
                  : colors.textSecondary
              }
            />

            <Text
              style={[
                styles.label,
                isActive && styles.activeLabel,
              ]}
            >
              {tab.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 14,
    paddingBottom: 20,
    paddingHorizontal: 8,
  },

  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 46,
  },

  label: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '500',
    marginTop: 6,
  },

  activeLabel: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});
