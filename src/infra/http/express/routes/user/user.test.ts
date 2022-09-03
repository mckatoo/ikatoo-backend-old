import { CreateUserUseCase } from '@application/user/create/create-user.use-case'
import { clearUserSqliteRepository } from '@infra/db/sqlite'
import { UserSqliteRepository } from '@infra/db/user/sqlite/user-sqlite.repository'
import app from '@infra/http/express/app'
import request from 'supertest'

describe('Express - User', () => {
  const userRepository = new UserSqliteRepository()
  const createUseCase = new CreateUserUseCase(userRepository)
  let accessToken: string

  beforeAll(async () => {
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
    await clearUserSqliteRepository()
  })

  it('should create user without id', async () => {
    const response = await request(app)
      .post('/user')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Test User',
        username: 'test_user_sdfj',
        email: 'test@user2.com',
        password: '123teste312',
        domain: 'ikatoo.com.br'
      })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
  })

  it('should create user with id', async () => {
    const userData = {
      id: 'user_with_id',
      name: 'User With Id',
      username: 'user_with_id',
      email: 'user_with_id@katoo.com',
      password: 'teste12345',
      domain: 'user_with_id.com.br'
    }
    const response = await request(app)
      .post('/user')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(userData)

    expect(response.status).toBe(201)
    expect(response.body).not.toHaveProperty('password')
    expect(response.body).toEqual({ ...userData, password: undefined })
  })
})
