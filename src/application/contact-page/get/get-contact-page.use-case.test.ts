import { CreateUserUseCase } from '@application/user/create/create-user.use-case'
import { ContactPageProps } from '@domain/contact-page/contact-page.entity'
import { UserWithId } from '@domain/user/user.repository'
import { ContactPagesRepository } from '@infra/db/contact-page'
import { UserRepository } from '@infra/db/user'
import { generateString } from '@infra/generate'

import { GetContactPageUseCase } from './get-contact-page.use-case'

describe('Get Skills Page use-case Test', () => {
  it('should get the contact page', async () => {
    const userRepository = new UserRepository()
    const createUserUseCase = new CreateUserUseCase(userRepository)
    const repository = new ContactPagesRepository()
    const getUseCase = new GetContactPageUseCase(repository)

    const userData: UserWithId = {
      name: generateString(),
      username: generateString(),
      email: `${generateString()}@email.com`,
      password: generateString(),
      domain: `${generateString()}.com`,
      avatar_url: '',
      avatar_alt: ''
    }
    const user = await createUserUseCase.execute(userData)

    const contactPageData: ContactPageProps = {
      title: generateString(),
      description: generateString(),
      user_id: user?.id ?? ''
    }

    await repository.create(contactPageData)
    const contactPageDataByUserId = await getUseCase.getByUserId(
      contactPageData.user_id
    )
    const contactPageByDomain = await getUseCase.getByDomain(user?.domain ?? '')
    expect(contactPageDataByUserId).toHaveProperty(
      'title',
      contactPageData.title
    )
    expect(contactPageDataByUserId).toHaveProperty(
      'description',
      contactPageData.description
    )
    expect(contactPageByDomain).toEqual(contactPageDataByUserId)
  })
})
