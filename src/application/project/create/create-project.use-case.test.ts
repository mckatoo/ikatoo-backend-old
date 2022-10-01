import { ProjectProps } from '@domain/projects/project.entity'
import { ProjectRepository } from '@infra/db/project'
import { generateString } from '@infra/generate'
import { CreateProjectUseCase } from './create-project.use-case'

describe('Create Project use-case Test', () => {
  const repository = new ProjectRepository()
  const createUseCase = new CreateProjectUseCase(repository)

  it('should create a new skill without id', async () => {
    const mock: ProjectProps = {
      title: generateString(),
      sub_title: generateString(),
      description: generateString(),
      github_link: generateString(),
      snapshot: generateString(),
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
      sub_title: generateString(),
      description: generateString(),
      github_link: generateString(),
      snapshot: generateString(),
      user_id: generateString()
    }

    await createUseCase.execute(mock)
    const expectedResult = await repository.getByUserId(mock.user_id)

    expect(expectedResult).toEqual([mock])
  })
})
