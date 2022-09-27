import app from '@infra/http/express/app'
import request from 'supertest'

import { CreateUserUseCase } from '@application/user/create/create-user.use-case'
import { UserSqliteRepository } from '@infra/db/user/sqlite/user-sqlite.repository'
import { generateString } from '@infra/generate'
import { Request, Response } from 'express'
import { decodeToken } from './decodeToken'
import { expressVerifyToken } from './verifyToken'

describe('Express - Auth', () => {
  const repository = new UserSqliteRepository()
  const createUseCase = new CreateUserUseCase(repository)

  app.get('/test', expressVerifyToken, (req: Request, res: Response) => {
    res.status(200).send()
  })

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
    expect(response.body.message).toBe('User not found')
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

    const refreshToken = response.body.refreshToken

    expect(decodeToken(refreshToken).userId).toBe(user.id)
    const expectedExpiresIn = (new Date().getTime() / 1000) + 15
    expect(decodeToken(refreshToken).expiresIn).toBeGreaterThanOrEqual(expectedExpiresIn - 1)
    expect(decodeToken(refreshToken).expiresIn).toBeLessThanOrEqual(expectedExpiresIn + 1)
  })

  it.skip('should expire token', async () => {
    const user = await createUseCase.execute({
      id: generateString(),
      name: generateString(),
      username: generateString(),
      email: `${generateString()}@katoo.com`,
      password: 'teste12345',
      domain: `${generateString()}.com.br`
    })

    const { body } = await request(app).post('/auth').send({
      username: user.username,
      password: 'teste12345'
    })
    const accessToken: string = body.accessToken
    const responseBeforeExpiration = await request(app).get('/test')
      .auth(accessToken, { type: 'bearer' })
      .send()
    expect(responseBeforeExpiration.status).toBe(200)
    jest.useFakeTimers()
    jest.advanceTimersByTime(61000)
    const responseAfterExpiration = await request(app)
      .get('/test')
      .auth(accessToken, { type: 'bearer' })
      .send()

    expect(responseAfterExpiration.status).toBe(200)

    jest.useRealTimers()
  })
})
