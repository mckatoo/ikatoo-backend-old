import { CreateSocialLinksUseCase } from '@application/social-links/create/create-social-links.use-case'
import { CreateUserUseCase } from '@application/user/create/create-user.use-case'
import { SocialLinksProps } from '@domain/social-links/social-links.entity'
import { SocialLinksRepository } from '@infra/db/social-links'
import { UserRepository } from '@infra/db/user'
import { generateString } from '@infra/generate'
import request from 'supertest'

import app from '../../app'

const socialLinksRepository = new SocialLinksRepository()
const createSocialLinksUseCase = new CreateSocialLinksUseCase(
  socialLinksRepository
)

const userRepository = new UserRepository()
const createUserUseCase = new CreateUserUseCase(userRepository)
let accessToken: string

beforeAll(async () => {
  const authResponse = await request(app)
    .post('/auth')
    .send({
      username: 'test',
      password: 'test'
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
      is_admin: false,
      avatar_url: '',
      avatar_alt: ''
    })

    let socialLinks: SocialLinksProps[] = []
    for (let i = 0; i < 5; i++) {
      const socialLinksData: SocialLinksProps = {
        id: generateString(),
        name: generateString(),
        url: generateString(),
        icon_url: generateString(),
        user_id: i % 2 === 0 ? user?.id ?? '' : generateString()
      }
      await createSocialLinksUseCase.execute(socialLinksData)
      if (i % 2 === 0) {
        socialLinks = [...socialLinks, socialLinksData]
      }
    }

    const response = await request(app)
      .get(`/social-links/user/${user?.id ?? ''}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toEqual(socialLinks)
  })

  it('should not get social links', async () => {
    const user = await createUserUseCase.execute({
      name: generateString(),
      username: generateString(),
      email: `${generateString()}@mail.com`,
      password: generateString(),
      is_admin: false,
      avatar_url: '',
      avatar_alt: ''
    })

    const response = await request(app)
      .get(`/social-links/user/${user?.id ?? ''}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual([])
  })
})
