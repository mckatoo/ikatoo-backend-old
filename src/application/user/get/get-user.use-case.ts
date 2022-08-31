import { UserProps } from '@domain/user/user.entity'
import { UserRepositoryInterface } from '@domain/user/user.repository'

type GetUserOutput = Omit<UserProps, 'password'> & { id?: string }

export class GetUserUseCase {
  constructor (private readonly userRepository: UserRepositoryInterface) {}

  async byUsername (username: string): Promise<GetUserOutput> {
    const user = await this.userRepository.getByUsername(username)

    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email
    }
  }

  async byEmail (email: string): Promise<GetUserOutput> {
    const user = await this.userRepository.getByEmail(email)

    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email
    }
  }
}
