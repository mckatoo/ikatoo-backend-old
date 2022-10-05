import { ContactPagesRepository } from '@infra/db/contact-page'
import { generateString } from '@infra/generate'
import { CreateContactPageUseCase } from './create-contact-page.use-case'

describe('Create Skills Page use-case Test', () => {
  const repository = new ContactPagesRepository()
  const createUseCase = new CreateContactPageUseCase(repository)

  it('should create a new contact page without id', async () => {
    const mock = {
      title: generateString(),
      description: generateString(),
      user_id: generateString()
    }

    await createUseCase.execute(mock)
    const expectedResult = await repository.getByUserId(mock.user_id)

    expect(expectedResult).toEqual({
      id: expectedResult.id,
      ...mock
    })
  })

  it('should create a new contact page with id', async () => {
    const mock = {
      id: generateString(),
      title: generateString(),
      description: generateString(),
      user_id: generateString()
    }

    await createUseCase.execute(mock)
    const expectedResult = await repository.getByUserId(mock.user_id)

    expect(expectedResult).toEqual(mock)
  })

  it('Should not create the contact page with existing user_id on the user', async () => {
    const mock = {
      title: generateString(),
      description: generateString(),
      user_id: generateString()
    }

    await createUseCase.execute(mock)
    await expect(createUseCase.execute({
      title: generateString(),
      description: generateString(),
      user_id: mock.user_id
    }))
      .rejects
      .toThrowError('This contact page already exists for this user')
  })
})
