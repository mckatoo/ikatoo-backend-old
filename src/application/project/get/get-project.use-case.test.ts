import { ProjectWithId } from '@domain/projects/project.repository'
import { UserWithId } from '@domain/user/user.repository'
import { ProjectRepository } from '@infra/db/project'
import { UserRepository } from '@infra/db/user'
import { generateString } from '@infra/generate'
import { GetProjectUseCase } from './get-project.use-case'

const userRepository = new UserRepository()
const repository = new ProjectRepository()
const getUseCase = new GetProjectUseCase(repository)

describe('Get Project use-case Test', () => {
  it('should get project from the user', async () => {
    const userMock: UserWithId = {
      id: generateString(),
      name: generateString(),
      email: `${generateString()}@email.com`,
      username: generateString(),
      password: generateString(),
      is_admin: false,
      avatar_url: '',
      avatar_alt: ''
    }
    await userRepository.create(userMock)
    const projectsMock: ProjectWithId[] = [
      {
        title: generateString(),
        sub_title: generateString(),
        description: generateString(),
        github_link: generateString(),
        snapshot: generateString(),
        user_id: userMock.id ?? ''
      },
      {
        title: generateString(),
        sub_title: generateString(),
        description: generateString(),
        github_link: generateString(),
        snapshot: generateString(),
        user_id: userMock.id ?? ''
      }
    ]
    await repository.create(projectsMock[0])
    await repository.create(projectsMock[1])

    const expectedResult = await getUseCase.byUserId(userMock.id ?? '')

    expect(expectedResult).toEqual([
      {
        id: expectedResult[0].id,
        ...projectsMock[0]
      },
      {
        id: expectedResult[1].id,
        ...projectsMock[1]
      }
    ])
  })
})
