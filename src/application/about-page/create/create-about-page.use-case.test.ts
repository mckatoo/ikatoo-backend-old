import { AboutPageRepository } from '@infra/db/about'
import { generate } from '@infra/generate'
import { CreateAboutPageUseCase } from './create-about-page.use-case'

describe('Create About Page use-case Test', () => {
  const repository = new AboutPageRepository()
  const createUseCase = new CreateAboutPageUseCase(repository)

  it('should create a new about page', async () => {
    const data = {
      title: generate(),
      description: generate(),
      user_id: generate()
    }

    const output = await createUseCase.execute(data)

    expect(output).toStrictEqual({
      id: (await repository.getByUserId(data.user_id)).id,
      ...data,
      image: { alt: '', src: '' },
      skills: []
    })
  })

  it('should create a new about page using a id', async () => {
    const data = {
      id: generate(),
      title: generate(),
      description: generate(),
      user_id: generate()
    }

    const aboutPage = await createUseCase.execute(data)

    expect(aboutPage).toStrictEqual({
      ...data,
      image: { alt: '', src: '' },
      skills: []
    })
  })
})
