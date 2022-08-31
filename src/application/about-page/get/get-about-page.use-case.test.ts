import { AboutPage } from '@domain/about/about-page.entity'
import { AboutPageMemoryRepository } from '@infra/db/about/inMemory/about-page-memory.repository'

import { GetAboutPageUseCase } from './get-about-page.use-case'

describe('Get About Page use-case Test', () => {
  it('should get the about page', async () => {
    const repository = new AboutPageMemoryRepository()
    const getUseCase = new GetAboutPageUseCase(repository)
    const aboutPage = AboutPage.create({
      title: 'title get',
      description: 'description get',
      user_id: 'get_user_id'
    })

    await repository.create(aboutPage)
    const aboutPageData = await getUseCase.execute('get_user_id')
    expect(aboutPageData).toHaveProperty('title', 'title get')
    expect(aboutPageData).toHaveProperty('description', 'description get')
  })
})
