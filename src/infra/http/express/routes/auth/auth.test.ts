import app from '@infra/http/express/app'
import request from 'supertest'

import { CreateUserUseCase } from '@application/user/create/create-user.use-case'
import { UserSqliteRepository } from '@infra/db/user/sqlite/user-sqlite.repository'
import { generateString } from '@infra/generate'
import { decodeToken } from './decodeToken'

describe('Express - Auth', () => {
  const repository = new UserSqliteRepository()
  const createUseCase = new CreateUserUseCase(repository)

  it('should authenticate a valid username', async () => {
    const user = await createUseCase.execute({
      id: generateString(),
      name: generateString(),
      username: generateString(),
      email: `${generateString()}@katoo.com`,
      password: 'teste12345',
      domain: `${generateString()}.com.br`
    })
    const response = await request(app).post('/auth').send({
      username: user.username,
      password: 'teste12345'
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('accessToken')
    expect(response.body).toHaveProperty('refreshToken')
  })

  it('should not authenticate a invalid user', async () => {
    const response = await request(app).post('/auth').send({
      username: 'invalid-username',
      password: 'invalid-pass'
    })

    expect(response.status).toBe(401)
  })

  it('should get user id an through token', async () => {
    const user = await createUseCase.execute({
      id: generateString(),
      name: generateString(),
      username: generateString(),
      email: `${generateString()}@katoo.com`,
      password: 'teste12345',
      domain: `${generateString()}.com.br`
    })
    const response = await request(app).post('/auth').send({
      username: user.username,
      password: 'teste12345'
    })

    const accessToken: string = response.body.accessToken
    const decodedAccessToken = decodeToken(accessToken)

    expect(decodedAccessToken.userId).toBe(user.id)
    expect(decodedAccessToken.expiresIn - decodedAccessToken.generatedAt).toBe(60)

    const refreshToken: string = response.body.refreshToken
    const decodedRefreshToken = decodeToken(refreshToken)

    expect(decodedRefreshToken.userId).toBe(user.id)
    expect(decodedRefreshToken.expiresIn - decodedRefreshToken.generatedAt).toBe(600)
  })
})
