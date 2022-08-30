import { open, Database as DatabaseSqlite } from "sqlite";
import { Database, Statement } from "sqlite3";

export type SqliteConnection = DatabaseSqlite<Database, Statement>;

export default async () =>
  await open<Database, Statement>({
    filename: "sqlite.db",
    driver: Database,
  });
