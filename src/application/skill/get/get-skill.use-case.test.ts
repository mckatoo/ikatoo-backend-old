import { SkillWithId } from '@domain/skill/skill.repository'
import { UserWithId } from '@domain/user/user.repository'
import { SkillRepository } from '@infra/db/skill'
import { UserRepository } from '@infra/db/user'
import { generateNumber, generateString } from '@infra/generate'
import { GetSkillUseCase } from './get-skill.use-case'

const userRepository = new UserRepository()
const repository = new SkillRepository()
const getUseCase = new GetSkillUseCase(repository)

describe('Get Skill use-case Test', () => {
  it('should get skill from the user', async () => {
    const userMock: UserWithId = {
      id: generateString(),
      name: generateString(),
      email: `${generateString()}@email.com`,
      username: generateString(),
      password: generateString(),
      domain: `${generateString()}.com`,
      avatar_url: '',
      avatar_alt: ''
    }
    await userRepository.create(userMock)
    const skillsMock: SkillWithId[] = [
      {
        title: generateString(),
        weight: generateNumber(),
        user_id: userMock.id ?? ''
      },
      {
        title: generateString(),
        weight: generateNumber(),
        user_id: userMock.id ?? ''
      }
    ]
    await repository.create(skillsMock[0])
    await repository.create(skillsMock[1])

    const expectedResult = await getUseCase.byUserId(userMock.id ?? '')

    expect(expectedResult).toEqual([
      {
        id: expectedResult[0].id,
        ...skillsMock[0]
      },
      {
        id: expectedResult[1].id,
        ...skillsMock[1]
      }
    ])
  })
})
