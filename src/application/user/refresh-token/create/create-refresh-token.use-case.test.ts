import { CreateUserUseCase } from '@application/user/create/create-user.use-case'
import { RefreshTokenRepository } from '@infra/db/refresh-token'
import { UserRepository } from '@infra/db/user'
import { generateString } from '@infra/generate'
import { CreateRefreshTokenUseCase } from './create-refresh-token.use-case'

describe('Create Refresh-Token use-case Test', () => {
  const refreshTokenRepository = new RefreshTokenRepository()
  const userRepository = new UserRepository()
  const createRefreshTokenUseCase = new CreateRefreshTokenUseCase(
    refreshTokenRepository,
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
    await createRefreshTokenUseCase.execute(user.id)

    const refreshToken = await refreshTokenRepository.getByUserId(user.id)

    expect(refreshToken?.userId).toBe(user.id)
  })

  it('should expire on 15 seconds', async () => {
    const user = await userUseCase.execute({
      name: generateString(),
      username: generateString(),
      email: `${generateString()}@mail.com`,
      password: generateString(),
      domain: `${generateString()}.com`
    })
    const expiresIn = parseInt(((new Date().getTime() / 1000) + 15).toFixed(0))
    await createRefreshTokenUseCase.execute(user.id)
    const refreshToken = await refreshTokenRepository.getByUserId(user.id)

    expect(refreshToken?.expiresIn).toBeGreaterThanOrEqual(expiresIn - 1)
    expect(refreshToken?.expiresIn).toBeLessThanOrEqual(expiresIn + 1)
  })
})
