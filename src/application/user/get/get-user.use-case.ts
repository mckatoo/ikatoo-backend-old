import { UserProps } from '@domain/user/user.entity'
import { UserRepositoryInterface } from '@domain/user/user.repository'
import { NotFoundError } from '@application/helpers/api-erros'

export type GetUserOutput = Omit<UserProps, 'password'> & { id?: string }

export class GetUserUseCase {
  constructor (private readonly userRepository: UserRepositoryInterface) {}

  async byUsername (username: string): Promise<GetUserOutput> {
    const user = await this.userRepository.getByUsername(username)
    if (user == null) throw new NotFoundError('User not found.')

    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      domain: user.domain
    }
  }

  async byEmail (email: string): Promise<GetUserOutput> {
    const user = await this.userRepository.getByEmail(email)
    if (user == null) throw new NotFoundError('User not found.')

    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      domain: user.domain
    }
  }

  async byDomain (domain: string): Promise<GetUserOutput> {
    const user = await this.userRepository.getByDomain(domain)
    if (user == null) throw new NotFoundError('User not found.')

    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      domain: user.domain
    }
  }

  async byId (id: string): Promise<GetUserOutput> {
    const user = await this.userRepository.getById(id)
    if (user == null) throw new NotFoundError('User not found.')

    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      domain: user.domain
    }
  }
}
