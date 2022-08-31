import { User, UserProps } from '@domain/user/user.entity'
import { UserRepositoryInterface } from '@domain/user/user.repository'
import { hashPassword } from '@infra/hashing-password'

type CreateUserInput = UserProps & { id?: string }

type CreateUserOutput = Omit<UserProps, 'password'> & { id: string }

export class CreateUserUseCase {
  constructor (private readonly menuRepository: UserRepositoryInterface) {}

  async execute (input: CreateUserInput): Promise<CreateUserOutput> {
    const user = User.create(
      { ...input, password: await hashPassword(10, input.password) },
      input.id
    )
    await this.menuRepository.create(user)

    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email
    }
  }
}
