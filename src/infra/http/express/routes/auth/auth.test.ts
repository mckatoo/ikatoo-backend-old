import app from '@infra/http/express/app'
import request from 'supertest'

import { CreateUserUseCase } from '@application/user/create/create-user.use-case'
import { UserRepository } from '@infra/db/user'
import { generateString } from '@infra/generate'
import auth from '@infra/github/auth'
import { Request, Response } from 'express'
import { decodeToken } from './decodeToken'
import { expressVerifyToken } from './verifyToken'

jest.mock('axios')
jest.mock('@infra/github/auth')

describe('Express - Auth', () => {
  const repository = new UserRepository()
  const createUseCase = new CreateUserUseCase(repository)

  beforeAll(() => {
    app.get('/test', expressVerifyToken, (req: Request, res: Response) => {
      res.status(200).send()
    })
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
    const response = await request(app)
      .post('/auth')
      .send({
        username: user?.username,
        password: 'teste12345'
      })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('accessToken')
    expect(response.body).toHaveProperty('refreshToken')
  })

  it('should not authenticate a invalid user', async () => {
    const response = await request(app)
      .post('/auth')
      .send({
        username: 'invalid-username',
        password: 'invalid-pass'
      })

    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Credentials invalid.')
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
    const response = await request(app)
      .post('/auth')
      .send({
        username: user?.username,
        password: 'teste12345'
      })

    const accessToken: string = response.body.accessToken
    const decodedAccessToken = decodeToken(accessToken)

    expect(decodedAccessToken.userId).toBe(user?.id)

    const refreshToken = response.body.refreshToken

    expect(decodeToken(refreshToken).userId).toBe(user?.id)
  })

  it('should get accessToken with expiration time in 1h', async () => {
    const user = await createUseCase.execute({
      id: generateString(),
      name: generateString(),
      username: generateString(),
      email: `${generateString()}@katoo.com`,
      password: 'teste12345',
      domain: `${generateString()}.com.br`
    })
    const response = await request(app)
      .post('/auth')
      .send({
        username: user?.username,
        password: 'teste12345'
      })

    const accessToken: string = response.body.accessToken
    const decodedAccessToken = decodeToken(accessToken)

    expect(decodedAccessToken.userId).toBe(user?.id)
    expect(decodedAccessToken.expiresIn - decodedAccessToken.generatedAt).toBe(
      60 * 60
    )
  })

  it('should get refreshToken with expiration time in 2 days', async () => {
    const user = await createUseCase.execute({
      id: generateString(),
      name: generateString(),
      username: generateString(),
      email: `${generateString()}@katoo.com`,
      password: 'teste12345',
      domain: `${generateString()}.com.br`
    })
    const response = await request(app)
      .post('/auth')
      .send({
        username: user?.username,
        password: 'teste12345'
      })

    const refreshToken = response.body.refreshToken
    const decodedRefreshToken = decodeToken(refreshToken)

    expect(
      decodedRefreshToken.expiresIn - decodedRefreshToken.generatedAt
    ).toBe(60 * 60 * 24 * 2)
  })

  it('should get new accessTokens and refreshToken using the refreshToken', async () => {
    const user = await createUseCase.execute({
      id: generateString(),
      name: generateString(),
      username: generateString(),
      email: `${generateString()}@katoo.com`,
      password: 'teste12345',
      domain: `${generateString()}.com.br`
    })
    const response = await request(app)
      .post('/auth')
      .send({
        username: user?.username,
        password: 'teste12345'
      })

    const responseRefreshToken = await request(app)
      .post('/auth/refresh-token')
      .auth(response.body.refreshToken, { type: 'bearer' })
      .send()
    const { accessToken, refreshToken } = responseRefreshToken.body
    const decodedAccessToken = decodeToken(accessToken)
    const decodedRefreshToken = decodeToken(refreshToken)

    expect(responseRefreshToken.status).toBe(200)
    expect(decodedAccessToken.userId).toBe(user?.id)
    expect(decodedRefreshToken.userId).toBe(user?.id)
  })

  it('should access protected route with AccessToken obtained through RefreshToken', async () => {
    const user = await createUseCase.execute({
      id: generateString(),
      name: generateString(),
      username: generateString(),
      email: `${generateString()}@katoo.com`,
      password: 'teste12345',
      domain: `${generateString()}.com.br`
    })
    const responseAuth = await request(app)
      .post('/auth')
      .send({
        username: user?.username,
        password: 'teste12345'
      })

    const responseRefreshToken = await request(app)
      .post('/auth/refresh-token')
      .auth(responseAuth.body.refreshToken, { type: 'bearer' })
      .send()
    const { accessToken } = responseRefreshToken.body

    const response = await request(app)
      .get('/test')
      .auth(accessToken, { type: 'bearer' })
      .send()

    expect(response.status).toBe(200)
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

    const { body } = await request(app)
      .post('/auth')
      .send({
        username: user?.username,
        password: 'teste12345'
      })
    const accessToken: string = body.accessToken
    const responseBeforeExpiration = await request(app)
      .get('/test')
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

  it('should get github access-token', async () => {
    const code = 'teste'

    const githubResponse = await request(app)
      .post('/auth/github')
      .send({ code })

    expect(auth).toHaveBeenCalledTimes(1)
    expect(auth).toHaveBeenCalledWith(code)
    expect(githubResponse.status).toBe(200)
  })
})
