import { UserProps } from '@domain/user/user.entity'
import {
  UserRepositoryInterface,
  UserWithId
} from '@domain/user/user.repository'
import { randomUUID } from 'crypto'
import database from './database'

export class UserSqliteRepository implements UserRepositoryInterface {
  async clear () {
    const db = await database()
    await db.run('delete from users')

    await db.close()
  }

  async create (user: UserWithId): Promise<void> {
    const db = await database()

    await db.run(
      'insert into users values(?,?,?,?,?,?,?,?)',
      user.id ?? randomUUID(),
      user.name,
      user.username,
      user.password,
      user.email,
      user.is_admin,
      user.avatar_url,
      user.avatar_alt
    )

    await db.close()
  }

  async getById (id: string): Promise<UserWithId | undefined> {
    const db = await database()
    const user = await db.get<UserWithId>(
      'select * from users where id = $id',
      { $id: id }
    )
    await db.close()

    return user
  }

  async getByUsername (username: string): Promise<UserWithId | undefined> {
    const db = await database()
    const user = await db.get<UserWithId>(
      'select * from users where username = $username',
      { $username: username }
    )
    await db.close()

    return user
  }

  async getByEmail (email: string): Promise<UserWithId | undefined> {
    const db = await database()
    const user = await db.get<UserWithId>(
      'select * from users where email = $email',
      {
        $email: email
      }
    )
    await db.close()

    return user
  }

  async getAdmin (): Promise<UserWithId | undefined> {
    const db = await database()
    const user = await db.get<UserWithId>(
      'select * from users'
    )
    await db.close()

    return user
  }

  async searchByName (partialName: string): Promise<UserWithId[]> {
    const db = await database()
    const users = await db.all<UserWithId[]>(
      `select * from users where name like '%${partialName}%'`
    )
    await db.close()

    return users
  }

  async getAll (): Promise<UserWithId[]> {
    const db = await database()
    const users = await db.all<UserWithId[]>('select * from users')
    await db.close()

    return users
  }

  async update (user: UserProps, id: string): Promise<void> {
    const db = await database()
    await db.run(
      `update users set 
      id = ?,
      name = ?,
      username = ?,
      password = ?,
      email = ?,
      is_admin = ?,
      avatar_url = ?,
      avatar_alt = ?
      where id = ?`,
      id,
      user.name,
      user.username,
      user.password,
      user.email,
      user.is_admin,
      user.avatar_url,
      user.avatar_alt,
      id
    )

    await db.close()
  }

  async remove (id: string): Promise<void> {
    const db = await database()
    await db.run('delete from users where id=?', id)

    await db.close()
  }
}
