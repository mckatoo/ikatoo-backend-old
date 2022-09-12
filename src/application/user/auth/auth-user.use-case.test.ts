import { UserRepository } from '@infra/db/user'
import { generateString } from '@infra/generate'
import { isValid } from '@infra/jwt'

import { CreateUserUseCase } from '../create/create-user.use-case'
import { AuthUserUseCase } from './auth-user.use-case'

describe('Auth User use-case Test', () => {
  const repository = new UserRepository()
  const authUseCase = new AuthUserUseCase(repository)
  const createUseCase = new CreateUserUseCase(repository)

  it('should authenticate a new user using username and password', async () => {
    const mock = {
      name: generateString(),
      email: `${generateString()}@mail.com`,
      username: generateString(),
      password: generateString(),
      domain: `${generateString()}.com`
    }
    await createUseCase.execute(mock)
    const { accessToken, refreshToken } = await authUseCase.authByUsername(
      mock.username,
      mock.password
    )

    expect(isValid(accessToken)).toBeDefined()
    expect(isValid(refreshToken)).toBeDefined()
  })

  it('should authenticate a user using email and password', async () => {
    const mock = {
      name: generateString(),
      email: `${generateString()}@mail.com`,
      username: generateString(),
      password: generateString(),
      domain: `${generateString()}.com`
    }
    await createUseCase.execute(mock)
    const { accessToken, refreshToken } = await authUseCase.authByEmail(
      mock.email,
      mock.password
    )

    expect(isValid(accessToken)).toBeDefined()
    expect(isValid(refreshToken)).toBeDefined()
  })

  it('should fail on authenticate a user using invalid username', async () => {
    const token = authUseCase.authByUsername('fail', '123passauth')

    await expect(token).rejects.toThrowError('User not found')
  })

  it('should fail on authenticate a user using invalid email', async () => {
    const token = authUseCase.authByEmail('fail@auth.com', '123passauth')

    await expect(token).rejects.toThrowError('User not found')
  })
})
