import { CreateAboutPageUseCase } from '@application/about-page/create/create-about-page.use-case'
import { GetAboutPageUseCase } from '@application/about-page/get/get-about-page.use-case'
import { CreateUserUseCase } from '@application/user/create/create-user.use-case'
import { AboutPageRepository } from '@infra/db/about'
import { UserSqliteRepository } from '@infra/db/user/sqlite/user-sqlite.repository'
import { generate } from '@infra/generate'
import app from '@infra/http/express/app'
import request from 'supertest'

describe('Express - About Page', () => {
  const userRepository = new UserSqliteRepository()
  const createUserUseCase = new CreateUserUseCase(userRepository)

  const aboutPageRepository = new AboutPageRepository()
  const getAboutPageUseCase = new GetAboutPageUseCase(aboutPageRepository)
  const createAboutPageUseCase = new CreateAboutPageUseCase(aboutPageRepository)

  let accessToken: string

  const userMock = {
    id: generate(),
    name: generate(),
    username: generate(),
    email: `${generate()}@katoo.com`,
    password: 'teste12345',
    domain: `${generate()}.com.br`
  }

  beforeAll(async () => {
    const user = await createUserUseCase.execute(userMock)
    const authResponse = await request(app).post('/auth').send({
      username: user.username,
      password: 'teste12345'
    })
    accessToken = authResponse.body.accessToken
  })

  it('should create about page without id', async () => {
    const aboutPageMock = {
      title: generate(),
      description: generate(),
      user_id: userMock.id
    }
    const response = await request(app)
      .post('/about')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(aboutPageMock)

    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      id: response.body.id,
      ...aboutPageMock,
      image: {
        alt: '',
        src: ''
      },
      skills: []
    })
  })

  it('should create about page with id', async () => {
    const aboutPageMock = {
      id: generate(),
      title: generate(),
      description: generate(),
      user_id: generate()
    }
    const response = await request(app)
      .post('/about')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(aboutPageMock)
    const aboutPage = await getAboutPageUseCase.getByUserId(aboutPageMock.user_id)

    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      ...aboutPage,
      image: {
        alt: '',
        src: ''
      },
      skills: []
    })
    expect(response.body).toEqual({
      ...aboutPageMock,
      image: {
        alt: '',
        src: ''
      },
      skills: []
    })
  })

  it('should get about page data', async () => {
    const userMock = {
      id: generate(),
      name: generate(),
      username: generate(),
      email: `${generate()}@katoo.com`,
      password: 'teste12345',
      domain: `${generate()}.com.br`
    }
    await createUserUseCase.execute(userMock)

    const aboutPageMock = {
      id: generate(),
      title: generate(),
      description: generate(),
      user_id: userMock.id
    }

    await createAboutPageUseCase.execute(aboutPageMock)
    const response = await request(app)
      .get('/about')
      .send({
        domain: userMock.domain
      })

    expect(response.status).toBe(200)
    expect(response.body).toEqual(aboutPageMock)
  })
})
