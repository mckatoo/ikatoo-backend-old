import { UserRepositoryInterface, UserWithId } from '@domain/user/user.repository'
import { comparePassword } from '@infra/hashing-password'
import { UnauthorizedError } from '@application/helpers/api-erros'
import { sign } from '@infra/jwt'
import { RefreshTokenRepository } from '@infra/db/refresh-token'
import { UserRepository } from '@infra/db/user'
import { CreateRefreshTokenUseCase } from '../refresh-token/create/create-refresh-token.use-case'

interface AuthUserOutput {
  accessToken: string
  refreshToken: string
}

const validateCredentials = async (user: UserWithId, password: string) => {
  const isValid = await comparePassword(password, user.password)
  if (!isValid || (user.id == null)) throw new Error('Credentials invalid.')

  const accessToken = sign({
    userId: user.id,
    expiresIn: '60s'
  })
  const refreshTokenRepository = new RefreshTokenRepository()
  const userRepository = new UserRepository()
  const refreshTokenUseCase = new CreateRefreshTokenUseCase(
    refreshTokenRepository,
    userRepository
  )
  await refreshTokenUseCase.execute(user.id)

  const refreshToken = await refreshTokenRepository.getByUserId(user.id)
  if (refreshToken != null) {
    return {
      accessToken,
      refreshToken: sign({
        userId: refreshToken.userId,
        expiresIn: '15s'
      })
    }
  }
  throw new Error()
}

export class AuthUserUseCase {
  constructor (private readonly userRepository: UserRepositoryInterface) {}

  async authByUsername (
    username: string,
    password: string
  ): Promise<AuthUserOutput> {
    const user = await this.userRepository.getByUsername(username)
    if (user == null) throw new UnauthorizedError('User not found')

    return await validateCredentials(user, password)
  }

  async authByEmail (email: string, password: string): Promise<AuthUserOutput> {
    const user = await this.userRepository.getByEmail(email)
    if (user == null) throw new UnauthorizedError('User not found')

    return await validateCredentials(user, password)
  }

  // async authByToken(refreshToken: string): Promise<AuthUserOutput> {

  //   const user = await this.userRepository.getByUsername(username);
  //   return validateCredentials(user, password);
  // }
}
