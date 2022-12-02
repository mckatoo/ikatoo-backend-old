import { UserRepository } from '@infra/db/user'
import { generateString } from '@infra/generate'

import { CreateUserUseCase } from './create-user.use-case'

describe('Create User use-case Test', () => {
  const repository = new UserRepository()
  const createUseCase = new CreateUserUseCase(repository)

  beforeEach(async () => {
    await repository.clear()
  })

  it('should create a new user without id', async () => {
    const mock = {
      name: generateString(),
      email: `${generateString()}@mail.com`,
      username: generateString(),
      password: generateString(),
      is_admin: true,
      avatar_url: '',
      avatar_alt: ''
    }

    await createUseCase.execute(mock)
    const expectedUser = await repository.getByUsername(mock.username)

    expect({ ...expectedUser, password: undefined }).toStrictEqual({
      ...mock,
      id: expectedUser?.id,
      password: undefined
    })
  })

  it('should create a new user with id', async () => {
    const mock = {
      id: generateString(),
      name: generateString(),
      email: `${generateString()}@mail.com`,
      username: generateString(),
      password: generateString(),
      is_admin: true,
      avatar_url: '',
      avatar_alt: ''
    }

    await createUseCase.execute(mock)
    const expectedUser = await repository.getByUsername(mock.username)

    expect({ ...expectedUser, password: undefined }).toStrictEqual({
      ...mock,
      password: undefined
    })
  })

  it('should not create a duplicated user', async () => {
    await createUseCase.execute({
      id: generateString(),
      name: generateString(),
      email: `${generateString()}@mail.com`,
      username: generateString(),
      password: generateString(),
      is_admin: true,
      avatar_url: '',
      avatar_alt: ''
    })
    const mock = {
      id: generateString(),
      name: generateString(),
      email: `${generateString()}@mail.com`,
      username: generateString(),
      password: generateString(),
      is_admin: false,
      avatar_url: '',
      avatar_alt: ''
    }

    await createUseCase.execute(mock)

    await expect(createUseCase.execute(mock)).rejects.toThrowError(
      'User already exists'
    )
  })

  it('should first user to be created must be an admin', async () => {
    const mock = {
      id: generateString(),
      name: generateString(),
      email: `${generateString()}@mail.com`,
      username: generateString(),
      password: generateString(),
      is_admin: false,
      avatar_url: '',
      avatar_alt: ''
    }

    await expect(createUseCase.execute(mock)).rejects.toThrowError(
      'The first user should be an admin.'
    )
  })

  it.todo('should have only one admin')
})
