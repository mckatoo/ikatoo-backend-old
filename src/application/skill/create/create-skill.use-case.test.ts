import { SkillRepository } from '@infra/db/skill'
import { generateNumber, generateString } from '@infra/generate'
import { CreateSkillUseCase } from './create-skill.use-case'

describe('Create Skill use-case Test', () => {
  const repository = new SkillRepository()
  const createUseCase = new CreateSkillUseCase(repository)

  it('should create a new skill without id', async () => {
    const mock = {
      title: generateString(),
      weight: generateNumber(),
      user_id: generateString()
    }

    await createUseCase.execute(mock)
    const expectedResult = await repository.getByUserId(mock.user_id)

    expect(expectedResult).toEqual([{
      id: expectedResult[0].id,
      ...mock
    }])
  })

  it('should create a new skill with id', async () => {
    const mock = {
      id: generateString(),
      title: generateString(),
      weight: generateNumber(),
      user_id: generateString()
    }

    await createUseCase.execute(mock)
    const expectedResult = await repository.getByUserId(mock.user_id)

    expect(expectedResult).toEqual([mock])
  })

  it('Should not create the skill with existing title on the user', async () => {
    const existingUserId = generateString()
    const existingTitle = generateString()
    const mock = {
      title: existingTitle,
      weight: generateNumber(),
      user_id: existingUserId
    }

    await createUseCase.execute(mock)
    await expect(createUseCase.execute(mock))
      .rejects
      .toThrowError('This skill already exists for this user')
  })
})
