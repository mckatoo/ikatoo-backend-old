import { NotFoundError } from '@application/helpers/api-erros'
import { UserRepositoryInterface } from '@domain/user/user.repository'
import { sign } from '@infra/jwt'

export class CreateRefreshTokenUseCase {
  constructor (
    private readonly userRepository: UserRepositoryInterface
  ) {}

  async execute (userId: string) {
    const userExists = await this.userRepository.getById(userId)
    if (userExists == null) throw new NotFoundError('User not found')

    const refreshToken = sign({
      userId,
      expiresIn: '15s'
    })

    return refreshToken
  }
}
