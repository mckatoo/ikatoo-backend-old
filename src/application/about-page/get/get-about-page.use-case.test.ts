import { AboutPage } from '@domain/about/about-page.entity'
import { AboutPageRepository } from '@infra/db/about'
import { clearAboutPagesSqliteRepository } from '@infra/db/sqlite'

import { GetAboutPageUseCase } from './get-about-page.use-case'

describe('Get About Page use-case Test', () => {
  beforeAll(async () => {
    await clearAboutPagesSqliteRepository()
  })

  afterAll(async () => {
    await clearAboutPagesSqliteRepository()
  })

  it('should get the about page', async () => {
    const repository = new AboutPageRepository()
    const getUseCase = new GetAboutPageUseCase(repository)
    const aboutPage = AboutPage.create({
      title: 'title get',
      description: 'description get',
      user_id: 'get_user_id'
    })

    await repository.create(aboutPage)
    const aboutPageData = await getUseCase.getByUserId('get_user_id')
    expect(aboutPageData).toHaveProperty('title', 'title get')
    expect(aboutPageData).toHaveProperty('description', 'description get')
  })
})
