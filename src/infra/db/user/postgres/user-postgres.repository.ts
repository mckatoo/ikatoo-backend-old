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
      'insert into users values($1, $2, $3, $4, $5, $6)', [
        user.id ?? randomUUID(),
        user.name,
        user.username,
        user.password,
        user.email,
        user.domain
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

  async getByDomain (domain: string): Promise<UserWithId | undefined> {
    const db = await database()
    try {
      const user = await db.one<UserWithId>(
        'select * from users where domain = $1', domain
      )
      return user
    } catch (error) {
      if (error instanceof Error) {
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
      domain = $6
      where id = $1`, [
        id,
        user.name,
        user.username,
        user.password,
        user.email,
        user.domain
      ]
    )
  }

  async remove (id: string): Promise<void> {
    const db = await database()
    await db.none('delete from users where id=$1', id)
  }
}
