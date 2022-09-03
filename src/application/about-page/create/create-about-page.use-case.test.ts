import { AboutPageRepository } from '@infra/db/about'
import { clearAboutPagesSqliteRepository } from '@infra/db/sqlite'
import { CreateAboutPageUseCase } from './create-about-page.use-case'

describe('Create About Page use-case Test', () => {
  const repository = new AboutPageRepository()
  const createUseCase = new CreateAboutPageUseCase(repository)

  beforeAll(async () => {
    await clearAboutPagesSqliteRepository()
  })

  afterAll(async () => {
    await clearAboutPagesSqliteRepository()
  })

  it('should create a new about page', async () => {
    const data = {
      title: 'title',
      description: 'description',
      user_id: 'new_user_id'
    }

    expect(await repository.getAll()).toHaveLength(0)

    const output = await createUseCase.execute(data)

    expect(output).toStrictEqual({
      id: (await repository.getByUserId('new_user_id')).id,
      ...data,
      image: { alt: '', src: '' },
      skills: []
    })
    expect(await repository.getAll()).toHaveLength(1)
  })

  it('should create a new about page using a id', async () => {
    const data = {
      id: 'about_page_id',
      title: 'title',
      description: 'description',
      user_id: 'other_new_user_id'
    }

    const aboutPage = await createUseCase.execute(data)

    expect(aboutPage).toStrictEqual({
      ...data,
      image: { alt: '', src: '' },
      skills: []
    })
  })
})
