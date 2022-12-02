import { ConflictError } from '@application/helpers/api-erros'
import { User, UserProps } from '@domain/user/user.entity'
import { UserRepositoryInterface } from '@domain/user/user.repository'
import { hashPassword } from '@infra/hashing-password'

type CreateUserInput = UserProps & { id?: string }

type CreateUserOutput = Omit<UserProps, 'password'> & { id: string }

export class CreateUserUseCase {
  constructor (private readonly repository: UserRepositoryInterface) {}

  async execute (input: CreateUserInput): Promise<CreateUserOutput | undefined> {
    const adminUser = await this.repository.getAdmin()
    if ((adminUser == null) && !input.is_admin) throw new ConflictError('The first user should be an admin.')

    let userExists = await this.repository.getByEmail(input.email)
    if (userExists != null) throw new ConflictError('User already exists')
    const user = User.create(
      { ...input, password: await hashPassword(10, input.password) },
      input.id
    )
    await this.repository.create(user)
    try {
      userExists = await this.repository.getByEmail(input.email)
      if (userExists?.id != null) {
        return {
          id: userExists.id,
          name: userExists.name,
          username: userExists.username,
          email: userExists.email,
          is_admin: userExists.is_admin,
          avatar_url: userExists.avatar_url,
          avatar_alt: userExists.avatar_alt
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
    }
  }
}
