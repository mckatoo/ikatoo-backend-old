import { UserRepository } from '@infra/db/user'
import { CreateUserUseCase } from '../create/create-user.use-case'
import { GetUserUseCase } from './get-user.use-case'

describe('Get User use-case Test', () => {
  const repository = new UserRepository()
  const createUseCase = new CreateUserUseCase(repository)
  const getUseCase = new GetUserUseCase(repository)

  it('should get a user by email', async () => {
    const user = await createUseCase.execute({
      name: 'User Test',
      email: 'test@user.com',
      username: 'testuser',
      password: '1234521312',
      domain: 'testuser.com'
    })
    const output = await getUseCase.byEmail(user.email)

    expect(output).not.toHaveProperty('password')
    expect(output).toStrictEqual(user)
  })

  it('should get a user by username', async () => {
    const user = await createUseCase.execute({
      name: 'Username Test',
      email: 'username@user.com',
      username: 'username_test',
      password: '1234521312',
      domain: 'username_test.com'
    })
    const output = await getUseCase.byUsername(user.username)

    expect(output).not.toHaveProperty('password')
    expect(output).toStrictEqual(user)
  })

  it('should get a user by domain', async () => {
    const user = await createUseCase.execute({
      name: 'Username Test',
      email: 'domain@user.com',
      username: 'domain_test',
      password: '1234521312',
      domain: 'domain_test.com'
    })
    const output = await getUseCase.byUsername(user.username)

    expect(output).not.toHaveProperty('password')
    expect(output).toStrictEqual(user)
  })
})
