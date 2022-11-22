import { AboutPageUpdateType } from '@domain/about/about-page.repository'
import { AboutPageRepository } from '@infra/db/about'
import { generateString } from '@infra/generate'
import { UpdateAboutPageUseCase } from './update-about-page.use-case'

describe('Update About Page use-case Test', () => {
  const repository = new AboutPageRepository()
  const updateUseCase = new UpdateAboutPageUseCase(repository)

  it('should update a new about page', async () => {
    const data = {
      id: generateString(),
      title: generateString(),
      description: generateString(),
      user_id: generateString()
    }
    await repository.create(data)

    const newData: AboutPageUpdateType = {
      id: data.id,
      title: `New Title ${generateString()}`,
      description: `New Description ${generateString()}`
    }
    await updateUseCase.execute(newData)

    // const aboutPage = await repository.getByUserId(data.user_id)

    // expect(aboutPage).toEqual(newData)
  })
})
