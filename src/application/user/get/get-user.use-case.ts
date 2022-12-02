import { UserProps } from '@domain/user/user.entity'
import { UserRepositoryInterface } from '@domain/user/user.repository'
import { NotFoundError } from '@application/helpers/api-erros'

export type GetUserOutput = Omit<UserProps, 'password'> & { id?: string }

export class GetUserUseCase {
  constructor (private readonly userRepository: UserRepositoryInterface) {}

  async byUsername (username: string): Promise<Required<GetUserOutput>> {
    const user = await this.userRepository.getByUsername(username)
    if (user == null || user.id == null) throw new NotFoundError('User not found.')

    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      is_admin: user.is_admin,
      avatar_url: user.avatar_url,
      avatar_alt: user.avatar_alt
    }
  }

  async byEmail (email: string): Promise<Required<GetUserOutput>> {
    const user = await this.userRepository.getByEmail(email)
    if (user == null || user.id == null) throw new NotFoundError('User not found.')

    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      is_admin: user.is_admin,
      avatar_url: user.avatar_url,
      avatar_alt: user.avatar_alt
    }
  }

  async byAdmin (): Promise<Required<GetUserOutput>> {
    const user = await this.userRepository.getAdmin()
    if (user == null || user.id == null) throw new NotFoundError('User not found.')

    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      is_admin: user.is_admin,
      avatar_url: user.avatar_url,
      avatar_alt: user.avatar_alt
    }
  }

  async byId (id: string): Promise<Required<GetUserOutput>> {
    const user = await this.userRepository.getById(id)
    if (user == null || user.id == null) throw new NotFoundError('User not found.')

    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      is_admin: user.is_admin,
      avatar_url: user.avatar_url,
      avatar_alt: user.avatar_alt
    }
  }
}
