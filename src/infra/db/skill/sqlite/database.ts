import { initDb } from '@infra/db/sqlite'
import { Database as DatabaseSqlite } from 'sqlite'
import { Database, Statement } from 'sqlite3'

export type SqliteConnection = DatabaseSqlite<Database, Statement>

export default async () => {
  const db = await initDb()

  await db.exec(`create table if not exists skills (
    id text NOT NULL UNIQUE PRIMARY KEY, 
    title text NOT NULL, 
    weight integer NOT NULL, 
    user_id text NOT NULL 
    )`)

  return db
}
