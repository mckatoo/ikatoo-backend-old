import { initDb } from '@infra/db/sqlite'
import { Database as DatabaseSqlite } from 'sqlite'
import { Database, Statement } from 'sqlite3'

export type SqliteConnection = DatabaseSqlite<Database, Statement>

export default async () => {
  const db = await initDb()

  await db.exec(`create table if not exists users (
    id text NOT NULL UNIQUE PRIMARY KEY, 
    name text NOT NULL, 
    username text NOT NULL UNIQUE, 
    password text NOT NULL, 
    email text NOT NULL UNIQUE,
    is_admin boolean NOT NULL,
    avatar_url text,
    avatar_alt text
    )`)

  return db
}
