import app from '@infra/http/express/app'
import request from 'supertest'

import { CreateUserUseCase } from '@application/user/create/create-user.use-case'
import { UserSqliteRepository } from '@infra/db/user/sqlite/user-sqlite.repository'
import { generate } from '@infra/generate'

describe('Express - Auth', () => {
  const repository = new UserSqliteRepository()
  const createUseCase = new CreateUserUseCase(repository)

  it('should authenticate a valid username', async () => {
    const user = await createUseCase.execute({
      id: generate(),
      name: generate(),
      username: generate(),
      email: `${generate()}@katoo.com`,
      password: 'teste12345',
      domain: `${generate()}.com.br`
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
