import { CreateUserUseCase } from '@application/user/create/create-user.use-case'
import { SkillsPageWithId } from '@domain/skills-page/skills-page.repository'
import { UserWithId } from '@domain/user/user.repository'
import { SkillsPagesRepository } from '@infra/db/skills-page'
import { UserRepository } from '@infra/db/user'
import { generateString } from '@infra/generate'

import { GetSkillsPageUseCase } from './get-skills-page.use-case'

describe('Get Skills Page use-case Test', () => {
  it('should get the skills page', async () => {
    const userRepository = new UserRepository()
    const createUserUseCase = new CreateUserUseCase(userRepository)
    const repository = new SkillsPagesRepository()
    const getUseCase = new GetSkillsPageUseCase(repository)

    const userData: UserWithId = ({
      name: generateString(),
      username: generateString(),
      email: `${generateString()}@email.com`,
      password: generateString(),
      domain: `${generateString()}.com`
    })
    const user = await createUserUseCase.execute(userData)

    const skillsPageData: SkillsPageWithId = {
      title: generateString(),
      description: generateString(),
      user_id: user.id
    }

    await repository.create(skillsPageData)
    const skillsPageDataByUserId = await getUseCase.getByUserId(skillsPageData.user_id)
    const skillsPageByDomain = await getUseCase.getByDomain(user.domain)
    expect(skillsPageDataByUserId).toHaveProperty('title', skillsPageData.title)
    expect(skillsPageDataByUserId).toHaveProperty('description', skillsPageData.description)
    expect(skillsPageByDomain).toEqual(skillsPageDataByUserId)
  })
})
