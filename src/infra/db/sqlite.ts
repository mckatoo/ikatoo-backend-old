import { open } from 'sqlite'
import { Database, Statement } from 'sqlite3'
import database from './user/sqlite/database'

async function initDb () {
  return await open<Database, Statement>({
    filename: 'sqlite.db',
    driver: Database
  })
}

async function clearUserSqliteRepository () {
  const db = await database()
  await db.run('delete from users')
  await db.close()
}

export { initDb, clearUserSqliteRepository }
