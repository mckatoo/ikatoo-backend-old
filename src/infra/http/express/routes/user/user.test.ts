import { CreateUserUseCase } from '@application/user/create/create-user.use-case'
import { UserRepository } from '@infra/db/user'
import { generateString } from '@infra/generate'
import app from '@infra/http/express/app'
import request from 'supertest'

describe('Express - User', () => {
  const userRepository = new UserRepository()
  const createUseCase = new CreateUserUseCase(userRepository)
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
    await createUseCase.execute(userMock)
    const authResponse = await request(app).post('/auth').send({
      username: userMock.username,
      password: 'teste12345'
    })
    accessToken = authResponse.body.accessToken
  })

  it('should not create user without authorization', async () => {
    const response = await request(app)
      .post('/user')
      .send({
        name: generateString(),
        username: generateString(),
        email: `${generateString()}@user2.com`,
        password: '123teste312',
        domain: `${generateString()}.com.br`
      })

    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Token is missing')
  })

  it('should create user without id', async () => {
    const response = await request(app)
      .post('/user')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: generateString(),
        username: generateString(),
        email: `${generateString()}@user2.com`,
        password: '123teste312',
        domain: `${generateString()}.com.br`
      })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
  })

  it('should create user with id', async () => {
    const userData = {
      id: generateString(),
      name: generateString(),
      username: generateString(),
      email: `${generateString()}@katoo.com`,
      password: 'teste12345',
      domain: `${generateString()}.com.br`
    }
    const response = await request(app)
      .post('/user')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(userData)

    expect(response.status).toBe(201)
    expect(response.body).not.toHaveProperty('password')
    expect(response.body).toEqual({ ...userData, password: undefined })
  })

  it('should not create duplicated user', async () => {
    const userData = {
      id: generateString(),
      name: generateString(),
      username: generateString(),
      email: `${generateString()}@katoo.com`,
      password: 'teste12345',
      domain: `${generateString()}.com.br`
    }
    await request(app)
      .post('/user')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(userData)
    const response = await request(app)
      .post('/user')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(userData)

    expect(response.status).toBe(409)
    expect(response.body.message).toBe('User already exists')
  })
})
