import { NotFoundError } from '@application/helpers/api-erros'
import { RefreshTokenRepositoryInterface } from '@domain/refresh-token/refresh-token.repository'
import { UserRepositoryInterface } from '@domain/user/user.repository'

export class CreateRefreshTokenUseCase {
  constructor (
    private readonly refreshTokenRepository: RefreshTokenRepositoryInterface,
    private readonly userRepository: UserRepositoryInterface
  ) {}

  async execute (userId: string) {
    const userExists = await this.userRepository.getById(userId)
    if (userExists == null) throw new NotFoundError('User not found')

    const expiresIn = new Date().getTime() + 15000 // 15seconds after
    const refreshTokenExists = await this.refreshTokenRepository.getByUserId(userId)
    if (refreshTokenExists != null) await this.refreshTokenRepository.delete(userId)

    await this.refreshTokenRepository.create({
      userId,
      expiresIn
    })
  }
}
