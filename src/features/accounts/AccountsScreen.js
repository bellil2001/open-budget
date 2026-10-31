
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import { colors } from '../../theme/colors';

import AccountSummaryCard from './components/AccountSummaryCard';
import AccountCard from './components/AccountCard';
import AccountForm from './components/AccountForm';

import {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
} from '../../database/repositories/accountRepository';

export default function AccountsScreen() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);

  async function loadAccounts() {
    try {
      const data = await getAccounts();
      setAccounts(data);
    } catch (error) {
      Alert.alert('Database Error', error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAccounts();
  }, []);

  function openAddForm() {
    setEditingAccount(null);
    setFormVisible(true);
  }

  function openEditForm(account) {
    setEditingAccount(account);
    setFormVisible(true);
  }

  async function handleSave(accountData) {
    if (saving) return;

    setSaving(true);

    try {
      if (editingAccount) {
        await updateAccount(editingAccount.id, accountData);
      } else {
        await createAccount(accountData);
      }

      await loadAccounts();
      setFormVisible(false);
      setEditingAccount(null);
    } catch (error) {
      Alert.alert('Save Error', error.message);
    } finally {
      setSaving(false);
    }
  }

  function confirmDelete(account) {
    Alert.alert(
      'Delete Account',
      `Are you sure you want to delete "${account.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteAccount(account.id);
              await loadAccounts();
            } catch (error) {
              Alert.alert('Delete Error', error.message);
            }
          },
        },
      ]
    );
  }

  const totalMillimes = accounts.reduce(
    (sum, account) => sum + account.balanceMillimes,
    0
  );

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          size="large"
          color={colors.primary}
        />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.label}>MY FINANCES</Text>
        <Text style={styles.title}>Accounts</Text>

        <Text style={styles.description}>
          Manage your cash, bank and savings accounts.
        </Text>

        <AccountSummaryCard
          totalBalance={totalMillimes / 1000}
          accountCount={accounts.length}
        />

        <Pressable
          style={styles.addButton}
          onPress={openAddForm}
        >
          <Text style={styles.addText}>
            + Add Account
          </Text>
        </Pressable>

        <Text style={styles.sectionTitle}>
          My Accounts
        </Text>

        {accounts.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>
              No accounts yet
            </Text>
            <Text style={styles.emptyDescription}>
              Add your first account to get started.
            </Text>
          </View>
        ) : (
          accounts.map(account => (
            <View key={account.id}>
              <AccountCard
                name={account.name}
                type={account.type}
                balanceMillimes={account.balanceMillimes}
              />

              <View style={styles.actions}>
                <Pressable
                  onPress={() => openEditForm(account)}
                  style={styles.actionButton}
                >
                  <Text style={styles.editText}>Edit</Text>
                </Pressable>

                <Pressable
                  onPress={() => confirmDelete(account)}
                  style={styles.actionButton}
                >
                  <Text style={styles.deleteText}>Delete</Text>
                </Pressable>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <AccountForm
        visible={formVisible}
        account={editingAccount}
        onSave={handleSave}
        onClose={() => setFormVisible(false)}
        saving={saving}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 24,
    paddingBottom: 70,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: colors.primary,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 8,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 10,
  },
  addButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    alignItems: 'center',
  },
  addText: {
    color: colors.surface,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 16,
  },
  emptyCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
  },
  emptyTitle: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 17,
  },
  emptyDescription: {
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
    marginBottom: 18,
  },
  actionButton: {
    padding: 6,
  },
  editText: {
    color: colors.primary,
    fontWeight: '600',
  },
  deleteText: {
    color: colors.danger,
    fontWeight: '600',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
