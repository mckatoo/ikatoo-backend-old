import { initDb } from '@infra/db/sqlite'
import { Database as DatabaseSqlite } from 'sqlite'
import { Database, Statement } from 'sqlite3'

export type SqliteConnection = DatabaseSqlite<Database, Statement>

export default async () => {
  const db = await initDb()

  await db.exec(`create table if not exists localizations (
    id text NOT NULL UNIQUE PRIMARY KEY, 
    latitude text NOT NULL, 
    longitude text NOT NULL, 
    user_id text UNIQUE NOT NULL 
    )`)

  return db
}
