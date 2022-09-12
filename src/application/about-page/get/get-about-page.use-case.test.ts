import { AboutPage } from '@domain/about/about-page.entity'
import { AboutPageRepository } from '@infra/db/about'
import { generateString } from '@infra/generate'

import { GetAboutPageUseCase } from './get-about-page.use-case'

describe('Get About Page use-case Test', () => {
  it('should get the about page', async () => {
    const repository = new AboutPageRepository()
    const getUseCase = new GetAboutPageUseCase(repository)
    const aboutPage = AboutPage.create({
      title: generateString(),
      description: generateString(),
      user_id: generateString()
    })

    await repository.create(aboutPage)
    const aboutPageData = await getUseCase.getByUserId(aboutPage.user_id)
    expect(aboutPageData).toHaveProperty('title', aboutPage.title)
    expect(aboutPageData).toHaveProperty('description', aboutPage.description)
  })
})
