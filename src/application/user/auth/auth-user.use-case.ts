import { UnauthorizedError } from '@application/helpers/api-erros'
import { UserRepositoryInterface, UserWithId } from '@domain/user/user.repository'
import { UserRepository } from '@infra/db/user'
import { comparePassword } from '@infra/hashing-password'
import { decodeToken } from '@infra/http/express/routes/auth/decodeToken'
import { sign } from '@infra/jwt'
import { CreateRefreshTokenUseCase } from '../refresh-token/create/create-refresh-token.use-case'

interface AuthUserOutput {
  accessToken: string
  refreshToken: string
}

const validateCredentials = async (user: UserWithId, password?: string) => {
  const isValid = password === undefined ? undefined : await comparePassword(password, user.password)
  if (isValid === false || (user.id == null)) throw new UnauthorizedError('Credentials invalid.')

  const accessToken = sign({
    userId: user.id,
    expiresIn: '1h'
  })
  const userRepository = new UserRepository()
  const refreshTokenUseCase = new CreateRefreshTokenUseCase(userRepository)
  const refreshToken = await refreshTokenUseCase.execute(user.id)

  return {
    accessToken,
    refreshToken
  }
}

export class AuthUserUseCase {
  constructor (private readonly userRepository: UserRepositoryInterface) {}

  async authByUsername (
    username: string,
    password: string
  ): Promise<AuthUserOutput> {
    const user = await this.userRepository.getByUsername(username)
    if (user == null) throw new UnauthorizedError('Credentials invalid.')

    return await validateCredentials(user, password)
  }

  async authByEmail (email: string, password: string): Promise<AuthUserOutput> {
    const user = await this.userRepository.getByEmail(email)
    if (user == null) throw new UnauthorizedError('Credentials invalid.')

    return await validateCredentials(user, password)
  }

  async authByRefreshToken (refreshToken: string): Promise<AuthUserOutput> {
    const decodedRefreshToken = decodeToken(refreshToken)
    const user = await this.userRepository.getById(decodedRefreshToken.userId)
    if (user == null) throw new UnauthorizedError('Credentials invalid.')

    return await validateCredentials(user)
  }
}
