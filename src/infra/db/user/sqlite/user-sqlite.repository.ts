import { UserProps } from "@domain/user/user.entity";
import {
  UserRepositoryInterface,
  UserWithId,
} from "@domain/user/user.repository";
import { randomUUID } from "crypto";
import database, { SqliteConnection } from "./database";

const db = database();

export class UserSqliteRepository implements UserRepositoryInterface {
  async create(user: UserProps): Promise<void> {
    (await db).exec(`create table users (
      id text, 
      name text, 
      username text, 
      password text, 
      email text
      )`);

    (await db).exec(`insert into users values(?,?,?,?,?)`, [
      randomUUID(),
      user.name,
      user.username,
      user.password,
      user.email,
    ]);
    (await db).close();
  }

  async getByUsername(username: string): Promise<UserWithId> {
    throw new Error("Method not implemented.");
  }

  getByEmail(email: string): Promise<UserWithId> {
    throw new Error("Method not implemented.");
  }

  searchByName(partialName: string): Promise<UserWithId[]> {
    throw new Error("Method not implemented.");
  }
}
