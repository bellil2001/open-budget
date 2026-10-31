
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Modal,
  StyleSheet,
} from 'react-native';

import { colors } from '../../../theme/colors';

const types = [
  { value: 'cash', label: 'Cash' },
  { value: 'bank', label: 'Bank' },
  { value: 'savings', label: 'Savings' },
];

export default function AccountForm({
  visible,
  account,
  onSave,
  onClose,
  saving = false,
}) {
  const [name, setName] = useState('');
  const [type, setType] = useState('cash');
  const [balance, setBalance] = useState('0');
  const [error, setError] = useState('');

  useEffect(() => {
    if (visible) {
      setName(account?.name || '');
      setType(account?.type || 'cash');
      setBalance(
        account
          ? (account.balanceMillimes / 1000).toFixed(3)
          : '0'
      );
      setError('');
    }
  }, [visible, account]);

  function handleSave() {
    const cleanName = name.trim();
    const cleanBalance = balance.trim().replace(',', '.');

    if (!cleanName) {
      setError('Please enter an account name.');
      return;
    }

    if (cleanName.length > 60) {
      setError('Account name must be 60 characters or less.');
      return;
    }

    if (!/^\d+(\.\d{1,3})?$/.test(cleanBalance)) {
      setError('Enter a valid balance with up to 3 decimals.');
      return;
    }

    const millimes = Math.round(Number(cleanBalance) * 1000);

    if (!Number.isSafeInteger(millimes)) {
      setError('The balance is too large.');
      return;
    }

    onSave({
      name: cleanName,
      type,
      balanceMillimes: millimes,
    });
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.form}>
          <Text style={styles.title}>
            {account ? 'Edit Account' : 'Add Account'}
          </Text>

          <Text style={styles.label}>Account Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="e.g. My Cash"
            maxLength={60}
          />

          <Text style={styles.label}>Account Type</Text>
          <View style={styles.typeRow}>
            {types.map(item => (
              <Pressable
                key={item.value}
                onPress={() => setType(item.value)}
                style={[
                  styles.typeButton,
                  type === item.value && styles.selectedType,
                ]}
              >
                <Text style={[
                  styles.typeText,
                  type === item.value && styles.selectedText,
                ]}>
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.label}>
            Opening Balance (TND)
          </Text>
          <TextInput
            style={styles.input}
            value={balance}
            onChangeText={setBalance}
            keyboardType="decimal-pad"
            placeholder="0.000"
          />

          {!!error && (
            <Text style={styles.error}>{error}</Text>
          )}

          <Pressable
            style={[styles.saveButton, saving && styles.disabled]}
            onPress={handleSave}
            disabled={saving}
          >
            <Text style={styles.saveText}>
              {saving ? 'Saving...' : 'Save Account'}
            </Text>
          </Pressable>

          <Pressable onPress={onClose} disabled={saving}>
            <Text style={styles.cancel}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  form: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 24,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 18,
  },
  label: {
    color: colors.text,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: colors.text,
  },
  typeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  selectedType: {
    backgroundColor: colors.primary,
  },
  typeText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  selectedText: {
    color: colors.surface,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  saveText: {
    color: colors.surface,
    fontWeight: 'bold',
  },
  cancel: {
    textAlign: 'center',
    color: colors.textSecondary,
    marginTop: 18,
  },
  error: {
    color: colors.danger,
    marginTop: 12,
  },
});
