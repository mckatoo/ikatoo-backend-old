import { CreateContactPageUseCase } from '@application/contact-page/create/create-contact-page.use-case'
import { GetContactPageUseCase } from '@application/contact-page/get/get-contact-page.use-case'
import { CreateUserUseCase } from '@application/user/create/create-user.use-case'
import { ContactPagesRepository } from '@infra/db/contact-page'
import { UserRepository } from '@infra/db/user'
import { generateString } from '@infra/generate'
import app from '@infra/http/express/app'
import request from 'supertest'

describe('Express - Contact Page', () => {
  const userRepository = new UserRepository()
  const createUserUseCase = new CreateUserUseCase(userRepository)

  const contactPageRepository = new ContactPagesRepository()
  const getContactPageUseCase = new GetContactPageUseCase(contactPageRepository)
  const createContactPageUseCase = new CreateContactPageUseCase(contactPageRepository)

  let accessToken: string

  const userMock = {
    id: generateString(),
    name: generateString(),
    username: generateString(),
    email: `${generateString()}@katoo.com`,
    password: 'teste12345',
    domain: `${generateString()}.com.br`
  }

  beforeAll(async () => {
    const user = await createUserUseCase.execute(userMock)
    const authResponse = await request(app).post('/auth').send({
      username: user?.username,
      password: 'teste12345'
    })
    accessToken = authResponse.body.accessToken
  })

  it('should create contact page without id', async () => {
    const contactPageMock = {
      title: generateString(),
      description: generateString(),
      user_id: userMock.id
    }
    const response = await request(app)
      .post('/contact-page')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(contactPageMock)
    const contact = await contactPageRepository.getByUserId(contactPageMock.user_id)

    expect(response.status).toBe(201)
    expect(contact).toEqual({
      id: contact.id,
      ...contactPageMock
    })
  })

  it('should create contact page with id', async () => {
    const contactPageMock = {
      id: generateString(),
      title: generateString(),
      description: generateString(),
      user_id: generateString()
    }
    const response = await request(app)
      .post('/contact-page')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(contactPageMock)
    const contactPage = await getContactPageUseCase.getByUserId(contactPageMock.user_id)

    expect(response.status).toBe(201)
    expect(contactPage).toEqual(contactPageMock)
  })

  it('should get contact page data', async () => {
    const userMock = {
      id: generateString(),
      name: generateString(),
      username: generateString(),
      email: `${generateString()}@katoo.com`,
      password: 'teste12345',
      domain: `${generateString()}.com.br`
    }
    await createUserUseCase.execute(userMock)

    const contactPageMock = {
      id: generateString(),
      title: generateString(),
      description: generateString(),
      user_id: userMock.id
    }

    await createContactPageUseCase.execute(contactPageMock)
    const response = await request(app)
      .get('/contact-page')
      .send({
        domain: userMock.domain
      })

    expect(response.status).toBe(200)
    expect(response.body).toEqual(contactPageMock)
  })
})
