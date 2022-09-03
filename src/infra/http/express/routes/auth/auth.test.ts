import app from '@infra/http/express/app'
import request from 'supertest'

import { CreateUserUseCase } from '@application/user/create/create-user.use-case'
import { clearUserSqliteRepository } from '@infra/db/sqlite'
import { UserSqliteRepository } from '@infra/db/user/sqlite/user-sqlite.repository'

describe('Express - Auth', () => {
  beforeAll(async () => {
    await clearUserSqliteRepository()
  })

  afterAll(async () => {
    await clearUserSqliteRepository()
  })

  const repository = new UserSqliteRepository()
  const createUseCase = new CreateUserUseCase(repository)

  it('should authenticate a valid username', async () => {
    const user = await createUseCase.execute({
      id: '9bec9383-5a22-4a70-9242-cfc3f3926ca8',
      name: 'Milton Carlos Katoo',
      username: 'milton',
      email: 'milton@katoo.com',
      password: 'teste12345',
      domain: 'ikatoo.com.br'
    })
    const response = await request(app).post('/auth').send({
      username: user.username,
      password: 'teste12345'
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('accessToken')
    expect(response.body).toHaveProperty('refreshToken')
  })

  // it('should not authenticate a invalid user', async () => {
  //   const call = async () => await request(app).post('/auth').send({
  //     username: 'invalid-username',
  //     password: 'invalid-pass'
  //   })

  //   expect(await call).toThrowError('User not found')
  // })

  // it("should get user data an through access token", async () => {
  //   const login = await request(app).post("/auth").send();
  // });

  // it("should not get user data an through invalid access token", async () => {
  //   const login = await request(app).post("/auth").send();
  // });

  // it("should renew access token and refresh token", async () => {
  //   const login = await request(app).post("/auth").send();
  // });

  // it("should not renew access token and refresh token", async () => {
  //   const login = await request(app).post("/auth").send();
  // });
})
