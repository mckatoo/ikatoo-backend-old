import { NotFoundError } from '@application/helpers/api-erros'
import { RefreshTokenRepositoryInterface } from '@domain/refresh-token/refresh-token.repository'
import { UserRepositoryInterface } from '@domain/user/user.repository'
import { decodeToken } from '@infra/http/express/routes/auth/decodeToken'
import { sign } from '@infra/jwt'

export class CreateRefreshTokenUseCase {
  constructor (
    private readonly refreshTokenRepository: RefreshTokenRepositoryInterface,
    private readonly userRepository: UserRepositoryInterface
  ) {}

  async execute (userId: string) {
    const userExists = await this.userRepository.getById(userId)
    if (userExists == null) throw new NotFoundError('User not found')

    const refreshTokenExists = await this.refreshTokenRepository.getByUserId(userId)
    if (refreshTokenExists != null) await this.refreshTokenRepository.delete(userId)
    const refreshToken = sign({
      userId,
      expiresIn: '15s'
    })

    const decodedRefreshToken = decodeToken(refreshToken)

    await this.refreshTokenRepository.create({
      userId,
      expiresIn: decodedRefreshToken.expiresIn
    })
  }
}
