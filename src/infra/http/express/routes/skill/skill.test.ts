import { CreateSkillUseCase } from '@application/skill/create/create-skill.use-case'
import { CreateUserUseCase } from '@application/user/create/create-user.use-case'
import { SkillWithId } from '@domain/skill/skill.repository'
import { SkillRepository } from '@infra/db/skill'
import { UserRepository } from '@infra/db/user'
import { generateNumber, generateString } from '@infra/generate'
import request from 'supertest'
import app from '../../app'

const skillRepository = new SkillRepository()
const createSkillUseCase = new CreateSkillUseCase(skillRepository)

const userRepository = new UserRepository()
const createUserUseCase = new CreateUserUseCase(userRepository)
let accessToken: string

const userMock = {
  id: generateString(),
  name: generateString(),
  username: generateString(),
  email: `${generateString()}@domain.com`,
  password: 'teste12345',
  domain: `${generateString()}.com.br`,
  avatar_url: '',
  avatar_alt: ''
}

beforeAll(async () => {
  await createUserUseCase.execute(userMock)
  const authResponse = await request(app)
    .post('/auth')
    .send({
      username: userMock.username,
      password: 'teste12345'
    })
  accessToken = authResponse.body.accessToken
})

describe('Express - Skill', () => {
  it('should not create skills without authorization', async () => {
    const response = await request(app)
      .post('/skill')
      .send({
        title: generateString(),
        weight: generateNumber()
      })

    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Token is missing')
  })

  it('should create skills for a user', async () => {
    const response = await request(app)
      .post('/skill')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: generateString(),
        weight: generateNumber()
      })

    expect(response.status).toBe(201)
  })

  it('should get skills for a user', async () => {
    const user = await createUserUseCase.execute({
      name: generateString(),
      username: generateString(),
      email: `${generateString()}@mail.com`,
      password: generateString(),
      domain: `${generateString()}.com`,
      avatar_url: '',
      avatar_alt: ''
    })

    let skills: SkillWithId[] = []
    for (let i = 0; i < 3; i++) {
      const newSkill = await createSkillUseCase.execute({
        title: generateString(),
        weight: generateNumber(),
        user_id: user?.id ?? ''
      })
      skills = [...skills, newSkill]
    }

    const response = await request(app)
      .get(`/skill/user/${user?.id ?? ''}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: generateString(),
        weight: generateNumber()
      })

    expect(response.status).toBe(200)
    expect(response.body).toEqual(skills)
  })

  it('should get skills for a user thrown access token', async () => {
    const userMock = {
      name: generateString(),
      username: generateString(),
      email: `${generateString()}@mail.com`,
      password: generateString(),
      domain: `${generateString()}.com`,
      avatar_url: '',
      avatar_alt: ''
    }
    const user = await createUserUseCase.execute(userMock)
    const authResponse = await request(app)
      .post('/auth')
      .send({
        username: userMock.username,
        password: userMock.password
      })
    const token: string = authResponse.body.accessToken

    let skills: SkillWithId[] = []
    for (let i = 0; i < 3; i++) {
      const newSkill = await createSkillUseCase.execute({
        title: generateString(),
        weight: generateNumber(),
        user_id: user?.id ?? ''
      })
      skills = [...skills, newSkill]
    }

    const response = await request(app)
      .get('/skill')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: generateString(),
        weight: generateNumber()
      })

    expect(response.status).toBe(200)
    expect(response.body).toEqual(skills)
  })
})
