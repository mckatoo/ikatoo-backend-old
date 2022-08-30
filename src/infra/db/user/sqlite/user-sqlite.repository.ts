import { UserProps } from "@domain/user/user.entity";
import {
  UserRepositoryInterface,
  UserWithId,
} from "@domain/user/user.repository";
import { randomUUID } from "crypto";

import database from "./database";

export class UserSqliteRepository implements UserRepositoryInterface {
  async create(user: UserWithId): Promise<void> {
    const db = await database();

    await db.exec(`create table if not exists users (
      id text NOT NULL UNIQUE PRIMARY KEY, 
      name text NOT NULL UNIQUE, 
      username text NOT NULL UNIQUE, 
      password text NOT NULL, 
      email text NOT NULL UNIQUE
      )`);

    await db.run(
      `insert into users values(?,?,?,?,?)`,
      user.id || randomUUID(),
      user.name,
      user.username,
      user.password,
      user.email
    );

    db.close();
  }

  async getByUsername(username: string): Promise<UserWithId> {
    const db = await database();
    const user = await db.get<UserWithId>(
      `select * from users where username = $username`,
      { $username: username }
    );
    db.close();

    if (!user) throw new Error("User not found");

    return user;
  }

  async getByEmail(email: string): Promise<UserWithId> {
    const db = await database();
    const user = await db.get<UserWithId>(
      "select * from users where email = $email",
      {
        $email: email,
      }
    );
    db.close();

    if (!user) throw new Error("User not found");

    return user;
  }

  async searchByName(partialName: string): Promise<UserWithId[]> {
    const db = await database();
    const users = await db.all<UserWithId[]>(
      `select * from users where name like '%${partialName}%'`
    );
    db.close();

    if (!users) throw new Error("User not found");

    return users;
  }

  async getAll(): Promise<UserWithId[]> {
    const db = await database();
    const users = await db.all<UserWithId[]>("select * from users");
    db.close();

    if (!users) throw new Error("User not found");

    return users;
  }

  async update(user: UserProps, id: string): Promise<void> {
    const db = await database();

    await db.run(
      `update users set 
      id = ?,
      name = ?,
      username = ?,
      password = ?,
      email = ?
      where id = ?`,
      id,
      user.name,
      user.username,
      user.password,
      user.email,
      id
    );

    db.close();
  }

  async remove(id: string): Promise<void> {
    const db = await database();

    await db.run(`delete from users where id=?`, id);

    db.close();
  }
}
