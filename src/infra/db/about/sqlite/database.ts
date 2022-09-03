import { initDb } from '@infra/db/sqlite'
import { Database as DatabaseSqlite } from 'sqlite'
import { Database, Statement } from 'sqlite3'

export type SqliteConnection = DatabaseSqlite<Database, Statement>

export default async () => {
  const db = await initDb()

  await db.exec(`create table if not exists aboutPages (
    id text NOT NULL UNIQUE PRIMARY KEY, 
    title text NOT NULL, 
    description text NOT NULL, 
    user_id text NOT NULL UNIQUE 
    )`)

  return db
}
