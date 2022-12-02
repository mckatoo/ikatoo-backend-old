import { CreateAboutPageUseCase } from '@application/about-page/create/create-about-page.use-case'
import { GetAboutPageUseCase } from '@application/about-page/get/get-about-page.use-case'
import { CreateUserUseCase } from '@application/user/create/create-user.use-case'
import { AboutPageRepository } from '@infra/db/about'
import { UserRepository } from '@infra/db/user'
import { generateString } from '@infra/generate'
import app from '@infra/http/express/app'
import request from 'supertest'

describe('Express - About Page', () => {
  const userRepository = new UserRepository()
  const createUserUseCase = new CreateUserUseCase(userRepository)

  const aboutPageRepository = new AboutPageRepository()
  const getAboutPageUseCase = new GetAboutPageUseCase(aboutPageRepository)
  const createAboutPageUseCase = new CreateAboutPageUseCase(aboutPageRepository)

  let accessToken: string

  const userMock = {
    id: generateString(),
    name: generateString(),
    username: generateString(),
    email: `${generateString()}@katoo.com`,
    password: 'teste12345',
    is_admin: true,
    avatar_url: '',
    avatar_alt: ''
  }

  beforeAll(async () => {
    await userRepository.clear()
    const user = await createUserUseCase.execute(userMock)
    const authResponse = await request(app).post('/auth').send({
      username: user?.username,
      password: 'teste12345'
    })
    accessToken = authResponse.body.accessToken
  })

  it('should create about page without id', async () => {
    const aboutPageMock = {
      title: generateString(),
      description: generateString(),
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
      }
    })
  })

  it('should create about page with id', async () => {
    const aboutPageMock = {
      id: generateString(),
      title: generateString(),
      description: generateString(),
      user_id: generateString()
    }
    const response = await request(app)
      .post('/about')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(aboutPageMock)
    const aboutPage = await getAboutPageUseCase.getByUserId(
      aboutPageMock.user_id
    )

    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      ...aboutPage,
      image: {
        alt: '',
        src: ''
      }
    })
    expect(response.body).toEqual({
      ...aboutPageMock,
      image: {
        alt: '',
        src: ''
      }
    })
  })

  it('should get about page data by user id', async () => {
    const userMock = {
      id: generateString(),
      name: generateString(),
      username: generateString(),
      email: `${generateString()}@katoo.com`,
      password: 'teste12345',
      is_admin: false,
      avatar_url: '',
      avatar_alt: ''
    }
    await createUserUseCase.execute(userMock)

    const aboutPageMock = {
      id: generateString(),
      title: generateString(),
      description: generateString(),
      user_id: userMock.id
    }

    await createAboutPageUseCase.execute(aboutPageMock)
    const response = await request(app).get(`/about/user_id/${userMock.id}`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(aboutPageMock)
  })

  it('should update about page', async () => {
    const aboutPageMock = {
      id: generateString(),
      title: generateString(),
      description: generateString(),
      user_id: generateString()
    }
    const newAboutPage = {
      ...aboutPageMock,
      title: `New Title ${generateString()}`,
      description: `New description ${generateString()}`
    }
    await aboutPageRepository.create(aboutPageMock)
    const response = await request(app)
      .put('/about')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(newAboutPage)

    const aboutPage = await getAboutPageUseCase.getByUserId(aboutPageMock.user_id)

    expect(response.status).toBe(201)
    expect(aboutPage).toEqual(newAboutPage)
  })
})
