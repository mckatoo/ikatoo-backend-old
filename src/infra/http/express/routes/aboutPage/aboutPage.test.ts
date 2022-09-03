import { GetAboutPageUseCase } from '@application/about-page/get/get-about-page.use-case'
import { CreateUserUseCase } from '@application/user/create/create-user.use-case'
import { AboutPageRepository } from '@infra/db/about'
import { clearAboutPagesSqliteRepository, clearUserSqliteRepository } from '@infra/db/sqlite'
import { UserSqliteRepository } from '@infra/db/user/sqlite/user-sqlite.repository'
import app from '@infra/http/express/app'
import request from 'supertest'

describe('Express - About Page', () => {
  const userRepository = new UserSqliteRepository()
  const createUseCase = new CreateUserUseCase(userRepository)

  const aboutPageRepository = new AboutPageRepository()
  const getAboutPageUseCase = new GetAboutPageUseCase(aboutPageRepository)

  let accessToken: string

  beforeAll(async () => {
    await clearAboutPagesSqliteRepository()
    await clearUserSqliteRepository()

    const user = await createUseCase.execute({
      id: 'user_id_test',
      name: 'Milton Carlos Katoo',
      username: 'milton',
      email: 'milton@katoo.com',
      password: 'teste12345',
      domain: 'teste.com.br'
    })
    const authResponse = await request(app).post('/auth').send({
      username: user.username,
      password: 'teste12345'
    })
    accessToken = authResponse.body.accessToken
  })

  afterAll(async () => {
    await clearAboutPagesSqliteRepository()
    await clearUserSqliteRepository()
  })

  it('should create about page without id', async () => {
    const response = await request(app)
      .post('/about')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'title',
        description: 'description',
        user_id: 'user_id_express'
      })

    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      id: response.body.id,
      title: 'title',
      description: 'description',
      user_id: 'user_id_express',
      image: {
        alt: '',
        src: ''
      },
      skills: []
    })
  })

  it('should create about page withid', async () => {
    const response = await request(app)
      .post('/about')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        id: 'about_page_id',
        title: 'title',
        description: 'description',
        user_id: 'user_id_test'
      })
    const aboutPage = await getAboutPageUseCase.getByUserId('user_id_test')

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
      id: 'about_page_id',
      title: 'title',
      description: 'description',
      user_id: 'user_id_test',
      image: {
        alt: '',
        src: ''
      },
      skills: []
    })
  })

  it('should get about page data', async () => {
    const response = await request(app)
      .get('/about')
      .send({
        domain: 'teste.com.br'
      })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      id: 'about_page_id',
      title: 'title',
      description: 'description',
      user_id: 'user_id_test'
    })
  })
})
