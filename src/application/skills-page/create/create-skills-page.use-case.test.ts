import { SkillsPagesRepository } from '@infra/db/skills-page'
import { generateString } from '@infra/generate'
import { CreateSkillsPageUseCase } from './create-skills-page.use-case'

describe('Create Skills Page use-case Test', () => {
  const repository = new SkillsPagesRepository()
  const createUseCase = new CreateSkillsPageUseCase(repository)

  it('should create a new skills page without id', async () => {
    const mock = {
      title: generateString(),
      description: generateString(),
      user_id: generateString()
    }

    await createUseCase.execute(mock)
    const expectedResult = await repository.getByUserId(mock.user_id)

    expect(expectedResult).toEqual({
      id: expectedResult.id,
      ...mock
    })
  })

  it('should create a new skills page with id', async () => {
    const mock = {
      id: generateString(),
      title: generateString(),
      description: generateString(),
      user_id: generateString()
    }

    await createUseCase.execute(mock)
    const expectedResult = await repository.getByUserId(mock.user_id)

    expect(expectedResult).toEqual(mock)
  })

  it('Should not create the skills page with existing user_id on the user', async () => {
    const mock = {
      title: generateString(),
      description: generateString(),
      user_id: generateString()
    }

    await createUseCase.execute(mock)
    await expect(createUseCase.execute({
      title: generateString(),
      description: generateString(),
      user_id: mock.user_id
    }))
      .rejects
      .toThrowError('This skills page already exists for this user')
  })
})
