import { open } from 'sqlite'
import { Database, Statement } from 'sqlite3'

async function initDb () {
  return await open<Database, Statement>({
    filename: 'sqlite.db',
    driver: Database
  })
}

export { initDb }
