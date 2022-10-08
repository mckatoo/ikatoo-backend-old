import { CreateLocalizationUseCase } from '@application/localization/create/create-localization.use-case'
import { CreateUserUseCase } from '@application/user/create/create-user.use-case'
import { LocalizationWithId } from '@domain/localization/localization.repository'
import { LocalizationRepository } from '@infra/db/localization'
import { UserRepository } from '@infra/db/user'
import { generateString } from '@infra/generate'
import request from 'supertest'

import app from '../../app'

const localizationRepository = new LocalizationRepository()
const createLocalizationUseCase = new CreateLocalizationUseCase(localizationRepository)

const userRepository = new UserRepository()
const createUserUseCase = new CreateUserUseCase(userRepository)
let accessToken: string

const userMock = {
  id: generateString(),
  name: generateString(),
  username: generateString(),
  email: `${generateString()}@domain.com`,
  password: 'teste12345',
  domain: `${generateString()}.com.br`
}

beforeAll(async () => {
  await createUserUseCase.execute(userMock)
  const authResponse = await request(app).post('/auth').send({
    username: userMock.username,
    password: 'teste12345'
  })
  accessToken = authResponse.body.accessToken
})

describe('Express - Localization', () => {
  it('should not create localizations without authorization', async () => {
    const response = await request(app)
      .post('/localization')
      .send({
        latitude: generateString(),
        longitude: generateString(),
        user_id: generateString()
      })

    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Token is missing')
  })

  it('should create localizations for a user', async () => {
    const response = await request(app)
      .post('/localization')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        latitude: generateString(),
        longitude: generateString(),
        user_id: generateString()
      })

    expect(response.status).toBe(201)
  })

  it('should get localizations for a user', async () => {
    let localizations: LocalizationWithId[] = []
    for (let i = 0; i < 3; i++) {
      localizations = [...localizations, {
        id: generateString(),
        latitude: generateString(),
        longitude: generateString(),
        user_id: generateString()
      }]
      await createLocalizationUseCase.execute(localizations[i])
    }

    const response = await request(app)
      .get(`/localization/user/${localizations[1].user_id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toEqual(localizations[1])
  })

  it('should return a error when try a location using access-token', async () => {
    const userMock = {
      name: generateString(),
      username: generateString(),
      email: `${generateString()}@mail.com`,
      password: generateString(),
      domain: `${generateString()}.com`
    }
    await createUserUseCase.execute(userMock)
    const authResponse = await request(app).post('/auth').send({
      username: userMock.username,
      password: userMock.password
    })
    const token: string = authResponse.body.accessToken

    const response = await request(app)
      .get('/localization')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message', 'Localization not found')
  })

  it('should get localizations for a user thrown access token', async () => {
    const userMock = {
      id: generateString(),
      name: generateString(),
      username: generateString(),
      email: `${generateString()}@mail.com`,
      password: generateString(),
      domain: `${generateString()}.com`
    }
    await createUserUseCase.execute(userMock)
    const authResponse = await request(app).post('/auth').send({
      username: userMock.username,
      password: userMock.password
    })
    const token: string = authResponse.body.accessToken
    const localization: LocalizationWithId = {
      id: generateString(),
      latitude: generateString(),
      longitude: generateString(),
      user_id: userMock.id
    }
    await createLocalizationUseCase.execute(localization)

    const response = await request(app)
      .get('/localization')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toEqual(localization)
  })

  it('should return a error message when localizations not found', async () => {
    const response = await request(app)
      .get(`/localization/user/${generateString()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()
    expect(response.status).toBe(404)
  })
})
