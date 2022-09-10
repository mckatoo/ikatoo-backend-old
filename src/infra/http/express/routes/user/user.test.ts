import { CreateUserUseCase } from '@application/user/create/create-user.use-case'
import { UserSqliteRepository } from '@infra/db/user/sqlite/user-sqlite.repository'
import { generate } from '@infra/generate'
import app from '@infra/http/express/app'
import request from 'supertest'

describe('Express - User', () => {
  const userRepository = new UserSqliteRepository()
  const createUseCase = new CreateUserUseCase(userRepository)
  let accessToken: string

  const userMock = {
    id: generate(),
    name: generate(),
    username: generate(),
    email: `${generate()}@domain.com`,
    password: 'teste12345',
    domain: `${generate()}.com.br`
  }

  beforeAll(async () => {
    await createUseCase.execute(userMock)
    const authResponse = await request(app).post('/auth').send({
      username: userMock.username,
      password: 'teste12345'
    })
    accessToken = authResponse.body.accessToken
  })

  it('should create user without id', async () => {
    const response = await request(app)
      .post('/user')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: generate(),
        username: generate(),
        email: `${generate()}@user2.com`,
        password: '123teste312',
        domain: `${generate()}.com.br`
      })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
  })

  it('should create user with id', async () => {
    const userData = {
      id: generate(),
      name: generate(),
      username: generate(),
      email: `${generate()}@katoo.com`,
      password: 'teste12345',
      domain: `${generate()}.com.br`
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
      id: generate(),
      name: generate(),
      username: generate(),
      email: `${generate()}@katoo.com`,
      password: 'teste12345',
      domain: `${generate()}.com.br`
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
