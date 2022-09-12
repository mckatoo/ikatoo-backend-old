import { SkillRepository } from '@infra/db/skill'
import { generateNumber, generateString } from '@infra/generate'

describe('Create Skill use-case Test', () => {
  const repository = new SkillRepository()
  // const createUseCase = new CreateSkillUseCase(repository)

  it('should create a new skill without id', async () => {
    const mock = {
      title: generateString(),
      weight: generateNumber(),
      user_id: generateString()
    }

    // await createUseCase.execute(mock)
    // const expectedResult = await repository.getByUserId(mock.user_id)

    // expect(expectedResult).toStrictEqual([{
    //   id: expectedResult[0].id,
    //   ...mock
    // }])
  })

  it('should create a new skill with id', async () => {
    const mock = {
      id: generateString(),
      title: generateString(),
      weight: generateNumber(),
      user_id: generateString()
    }

    // await createUseCase.execute(mock)
    // const expectedResult = await repository.getByUserId(mock.user_id)

    // expect(expectedResult).toStrictEqual([mock])
  })

  // it('Should not create the skill with existing title on the user', async () => {
    
  // });

  // it('should create a new user with id', async () => {
  //   const mock = {
  //     id: generateString(),
  //     name: generateString(),
  //     email: `${generateString()}@mail.com`,
  //     username: generateString(),
  //     password: generateString(),
  //     domain: `${generateString()}.com`
  //   }

  //   await createUseCase.execute(mock)
  //   const expectedUser = await repository.getByUsername(mock.username)

  //   expect({ ...expectedUser, password: undefined }).toStrictEqual({
  //     ...mock,
  //     password: undefined
  //   })
  // })

  // it('should not create a duplicated user', async () => {
  //   const mock = {
  //     id: generateString(),
  //     name: generateString(),
  //     email: `${generateString()}@mail.com`,
  //     username: generateString(),
  //     password: generateString(),
  //     domain: `${generateString()}.com`
  //   }

  //   await createUseCase.execute(mock)

  //   await expect(createUseCase.execute(mock)).rejects.toThrowError('User already exists')
  // })
})
