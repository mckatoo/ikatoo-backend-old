import { open, Database as DatabaseSqlite } from "sqlite";
import { Database, Statement } from "sqlite3";

export type SqliteConnection = DatabaseSqlite<Database, Statement>;

export default async () => {
  const db = await open<Database, Statement>({
    filename: "sqlite.db",
    driver: Database,
  });

  db.exec(`create table if not exists users (
    id text NOT NULL UNIQUE PRIMARY KEY, 
    name text NOT NULL, 
    username text NOT NULL UNIQUE, 
    password text NOT NULL, 
    email text NOT NULL UNIQUE
    )`);

  return db;
};
