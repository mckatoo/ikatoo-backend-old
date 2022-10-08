import { UserProps } from './user.entity'

export type UserWithId = UserProps & { id?: string }

export interface UserRepositoryInterface {
  create: (user: UserWithId) => Promise<void>
  getById: (id: string) => Promise<UserWithId | undefined>
  getByUsername: (username: string) => Promise<UserWithId | undefined>
  getByEmail: (email: string) => Promise<UserWithId | undefined>
  getByDomain: (domain: string) => Promise<UserWithId | undefined>
  searchByName: (partialName: string) => Promise<UserWithId[]>
  getAll: () => Promise<UserWithId[]>
  update: (user: UserProps, id: string) => Promise<void>
  remove: (id: string) => Promise<void>
  clear: () => Promise<void>
}
