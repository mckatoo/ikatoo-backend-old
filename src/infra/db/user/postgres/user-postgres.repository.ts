import { UserProps } from '@domain/user/user.entity'
import {
  UserRepositoryInterface,
  UserWithId
} from '@domain/user/user.repository'
import { randomUUID } from 'crypto'
import database from './database'

export class UserPostgresRepository implements UserRepositoryInterface {
  async clear () {
    const db = await database()
    await db.none('delete from users')
  }

  async create (user: UserWithId): Promise<void> {
    const db = await database()
    await db.none(
      'insert into users values($1, $2, $3, $4, $5, $6, $7, $8)', [
        user.id ?? randomUUID(),
        user.name,
        user.username,
        user.password,
        user.email,
        user.is_admin,
        user.avatar_url,
        user.avatar_alt
      ]
    )
  }

  async getById (id: string): Promise<UserWithId | undefined> {
    const db = await database()
    const user = await db.one<UserWithId>(
      'select * from users where id = $1', id
    )

    return user
  }

  async getByUsername (username: string): Promise<UserWithId | undefined> {
    const db = await database()
    try {
      const user = await db.one<UserWithId>(
        'select * from users where username = $1', username
      )
      return user
    } catch {}
  }

  async getByEmail (email: string): Promise<UserWithId | undefined> {
    const db = await database()
    try {
      const user = await db.one<UserWithId>(
        'select * from users where email = $1', email
      )
      return user
    } catch {}
  }

  async getAdmin (): Promise<UserWithId | undefined> {
    const db = await database()
    try {
      const user = await db.one<UserWithId>(
        'select * from users where is_admin = true'
      )
      return user
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('No data returned from the query')) return
        throw new Error(error.message)
      }
    }
  }

  async searchByName (partialName: string): Promise<UserWithId[]> {
    const db = await database()
    const users = await db.any<UserWithId>(
      `select * from users where name ilike '%${partialName}%'`
    )

    return users
  }

  async getAll (): Promise<UserWithId[]> {
    const db = await database()
    const users = await db.any<UserWithId>('select * from users')

    return users
  }

  async update (user: UserProps, id: string): Promise<void> {
    const db = await database()
    await db.none(
      `update users set 
      name = $2,
      username = $3,
      password = $4,
      email = $5,
      is_admin = $6,
      avatar_url = $7,
      avatar_alt = $8
      where id = $1`, [
        id,
        user.name,
        user.username,
        user.password,
        user.email,
        user.is_admin,
        user.avatar_url,
        user.avatar_alt
      ]
    )
  }

  async remove (id: string): Promise<void> {
    const db = await database()
    await db.none('delete from users where id=$1', id)
  }
}
