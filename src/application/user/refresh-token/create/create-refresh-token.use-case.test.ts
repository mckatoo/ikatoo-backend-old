import { CreateUserUseCase } from '@application/user/create/create-user.use-case'
import { UserRepository } from '@infra/db/user'
import { generateString } from '@infra/generate'
import { decodeToken } from '@infra/http/express/routes/auth/decodeToken'
import { CreateRefreshTokenUseCase } from './create-refresh-token.use-case'

describe('Create Refresh-Token use-case Test', () => {
  const userRepository = new UserRepository()
  const createRefreshTokenUseCase = new CreateRefreshTokenUseCase(
    userRepository
  )
  const userUseCase = new CreateUserUseCase(userRepository)

  it('should create a refresh-token', async () => {
    const user = await userUseCase.execute({
      name: generateString(),
      username: generateString(),
      email: `${generateString()}@mail.com`,
      password: generateString(),
      domain: `${generateString()}.com`
    })
    const refreshToken = await createRefreshTokenUseCase.execute(user.id)

    expect(decodeToken(refreshToken).userId).toBe(user.id)
  })

  it('should expire on 15 seconds', async () => {
    const user = await userUseCase.execute({
      name: generateString(),
      username: generateString(),
      email: `${generateString()}@mail.com`,
      password: generateString(),
      domain: `${generateString()}.com`
    })
    const expiresIn = parseInt(((new Date().getTime() / 1000) + (((60 * 60) * 24) * 2)).toFixed(0))
    const refreshToken = await createRefreshTokenUseCase.execute(user.id)

    expect(decodeToken(refreshToken).expiresIn).toBeGreaterThanOrEqual(expiresIn - 1)
    expect(decodeToken(refreshToken).expiresIn).toBeLessThanOrEqual(expiresIn + 1)
  })
})
