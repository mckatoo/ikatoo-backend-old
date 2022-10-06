import { CreateSocialLinksUseCase } from '@application/social-links/create/create-social-links.use-case'
import { CreateUserUseCase } from '@application/user/create/create-user.use-case'
import { SocialLinksProps } from '@domain/social-links/social-links.entity'
import { SocialLinksRepository } from '@infra/db/social-links'
import { UserSqliteRepository } from '@infra/db/user/sqlite/user-sqlite.repository'
import { generateString } from '@infra/generate'
import request from 'supertest'

import app from '../../app'

const socialLinksRepository = new SocialLinksRepository()
const createSocialLinksUseCase = new CreateSocialLinksUseCase(socialLinksRepository)

const userRepository = new UserSqliteRepository()
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

describe('Express - Social Links', () => {
  it('should not create social links without authorization', async () => {
    const socialLinksData: SocialLinksProps = {
      name: generateString(),
      url: generateString(),
      icon_url: generateString(),
      user_id: generateString()
    }
    const response = await request(app)
      .post('/social-links')
      .send(socialLinksData)

    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Token is missing')
  })

  it('should create social links for a user', async () => {
    const socialLinksData: SocialLinksProps = {
      name: generateString(),
      url: generateString(),
      icon_url: generateString(),
      user_id: generateString()
    }
    const response = await request(app)
      .post('/social-links')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(socialLinksData)

    expect(response.status).toBe(201)
  })

  it('should get social links of the user', async () => {
    const user = await createUserUseCase.execute({
      name: generateString(),
      username: generateString(),
      email: `${generateString()}@mail.com`,
      password: generateString(),
      domain: `${generateString()}.com`
    })

    let socialLinks: SocialLinksProps[] = []
    for (let i = 0; i < 5; i++) {
      const socialLinksData: SocialLinksProps = {
        id: generateString(),
        name: generateString(),
        url: generateString(),
        icon_url: generateString(),
        user_id: i % 2 === 0 ? user.id : generateString()
      }
      await createSocialLinksUseCase.execute(socialLinksData)
      if (i % 2 === 0) {
        socialLinks = [...socialLinks, socialLinksData]
      }
    }

    const response = await request(app)
      .get(`/social-links/user/${user.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toEqual(socialLinks)
  })

  it('should get social links of the user thrown access token', async () => {
    const userMock = {
      name: generateString(),
      username: generateString(),
      email: `${generateString()}@mail.com`,
      password: generateString(),
      domain: `${generateString()}.com`
    }
    const user = await createUserUseCase.execute(userMock)
    const authResponse = await request(app).post('/auth').send({
      username: userMock.username,
      password: userMock.password
    })
    const token: string = authResponse.body.accessToken

    let socialLinks: SocialLinksProps[] = []
    for (let i = 0; i < 5; i++) {
      const newSocialLink: SocialLinksProps = {
        id: generateString(),
        name: generateString(),
        url: generateString(),
        icon_url: generateString(),
        user_id: i % 2 === 0 ? user.id : generateString()
      }
      await createSocialLinksUseCase.execute(newSocialLink)
      if (i % 2 === 0) {
        socialLinks = [...socialLinks, newSocialLink]
      }
    }

    const response = await request(app)
      .get('/social-links')
      .set('Authorization', `Bearer ${token}`)
      .set('origin', `https://www.${userMock.domain}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toEqual(socialLinks)
  })

  it('should get social links of the user thrown domain url', async () => {
    const userMock = {
      name: generateString(),
      username: generateString(),
      email: `${generateString()}@mail.com`,
      password: generateString(),
      domain: generateString()
    }
    const user = await createUserUseCase.execute(userMock)

    let socialLinks: SocialLinksProps[] = []
    for (let i = 0; i < 5; i++) {
      const newSocialLink: SocialLinksProps = {
        id: generateString(),
        name: generateString(),
        url: generateString(),
        icon_url: generateString(),
        user_id: i % 2 === 0 ? user.id : generateString()
      }
      await createSocialLinksUseCase.execute(newSocialLink)
      if (i % 2 === 0) {
        socialLinks = [...socialLinks, newSocialLink]
      }
    }

    const response = await request(app)
      .get('/social-links')
      .set('origin', `https://www.${userMock.domain}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toEqual(socialLinks)
  })

  it('should not get social links', async () => {
    const response = await request(app)
      .get('/social-links')
      .set('origin', `https://www.${generateString()}`)
      .send()

    expect(response.status).toBe(404)
    expect(response.body.message).toEqual('Not found social links for this domain')
  })
})
