
import { getDatabase } from '../db';

export async function getAccounts() {
  const db = await getDatabase();

  return db.getAllAsync(`
    SELECT
      id,
      name,
      type,
      opening_balance_millimes AS balanceMillimes
    FROM accounts
    ORDER BY id DESC
  `);
}

export async function createAccount(account) {
  const db = await getDatabase();

  return db.runAsync(
    `INSERT INTO accounts
      (name, type, opening_balance_millimes)
     VALUES (?, ?, ?)`,
    account.name,
    account.type,
    account.balanceMillimes
  );
}

export async function updateAccount(id, account) {
  const db = await getDatabase();

  return db.runAsync(
    `UPDATE accounts
     SET name = ?,
         type = ?,
         opening_balance_millimes = ?,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    account.name,
    account.type,
    account.balanceMillimes,
    id
  );
}

export async function deleteAccount(id) {
  const db = await getDatabase();

  return db.runAsync(
    'DELETE FROM accounts WHERE id = ?',
    id
  );
}
