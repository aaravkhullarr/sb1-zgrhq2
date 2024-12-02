import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { join } from 'path';
import type { User } from '../types';

interface DbSchema {
  users: User[];
}

const file = join('db.json');
const adapter = new JSONFile<DbSchema>(file);
const defaultData: DbSchema = { users: [] };
export const db = new Low<DbSchema>(adapter, defaultData);

// Initialize the database
await db.read();
if (!db.data) {
  db.data = defaultData;
  await db.write();
}