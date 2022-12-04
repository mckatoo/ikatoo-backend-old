import { UserRepository } from '@infra/db/user'
import { decodeToken } from '@infra/http/express/routes/auth/decodeToken'
import { CreateRefreshTokenUseCase } from './create-refresh-token.use-case'

describe('Create Refresh-Token use-case Test', () => {
  const userRepository = new UserRepository()
  const createRefreshTokenUseCase = new CreateRefreshTokenUseCase(
    userRepository
  )

  it('should create a refresh-token', async () => {
    const refreshToken = await createRefreshTokenUseCase.execute('testId')

    expect(decodeToken(refreshToken).userId).toBe('testId')
  })

  it('should expire on 15 seconds', async () => {
    const expiresIn = parseInt(
      (new Date().getTime() / 1000 + 60 * 60 * 24 * 2).toFixed(0)
    )
    const refreshToken = await createRefreshTokenUseCase.execute('testId')

    expect(decodeToken(refreshToken).expiresIn).toBeGreaterThanOrEqual(
      expiresIn - 1
    )
    expect(decodeToken(refreshToken).expiresIn).toBeLessThanOrEqual(
      expiresIn + 1
    )
  })
})
