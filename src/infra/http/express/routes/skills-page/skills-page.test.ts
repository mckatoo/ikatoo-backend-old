import { CreateSkillsPageUseCase } from '@application/skills-page/create/create-skills-page.use-case'
import { GetSkillsPageUseCase } from '@application/skills-page/get/get-skills-page.use-case'
import { CreateUserUseCase } from '@application/user/create/create-user.use-case'
import { SkillsPagesRepository } from '@infra/db/skills-page'
import { UserRepository } from '@infra/db/user'
import { generateString } from '@infra/generate'
import app from '@infra/http/express/app'
import request from 'supertest'

describe('Express - Skills Page', () => {
  const userRepository = new UserRepository()
  const createUserUseCase = new CreateUserUseCase(userRepository)

  const skillsPageRepository = new SkillsPagesRepository()
  const getSkillsPageUseCase = new GetSkillsPageUseCase(skillsPageRepository)
  const createSkillsPageUseCase = new CreateSkillsPageUseCase(skillsPageRepository)

  let accessToken: string

  const userMock = {
    id: generateString(),
    name: generateString(),
    username: generateString(),
    email: `${generateString()}@katoo.com`,
    password: 'teste12345',
    domain: `${generateString()}.com.br`
  }

  beforeAll(async () => {
    const user = await createUserUseCase.execute(userMock)
    const authResponse = await request(app).post('/auth').send({
      username: user?.username,
      password: 'teste12345'
    })
    accessToken = authResponse.body.accessToken
  })

  it('should create skills page without id', async () => {
    const skillsPageMock = {
      title: generateString(),
      description: generateString(),
      user_id: userMock.id
    }
    const response = await request(app)
      .post('/skills-page')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(skillsPageMock)
    const skills = await skillsPageRepository.getByUserId(skillsPageMock.user_id)

    expect(response.status).toBe(201)
    expect(skills).toEqual({
      id: skills.id,
      ...skillsPageMock
    })
  })

  it('should create skills page with id', async () => {
    const skillsPageMock = {
      id: generateString(),
      title: generateString(),
      description: generateString(),
      user_id: generateString()
    }
    const response = await request(app)
      .post('/skills-page')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(skillsPageMock)
    const skillsPage = await getSkillsPageUseCase.getByUserId(skillsPageMock.user_id)

    expect(response.status).toBe(201)
    expect(skillsPage).toEqual(skillsPageMock)
  })

  it('should get skills page data', async () => {
    const userMock = {
      id: generateString(),
      name: generateString(),
      username: generateString(),
      email: `${generateString()}@katoo.com`,
      password: 'teste12345',
      domain: `${generateString()}.com.br`
    }
    await createUserUseCase.execute(userMock)

    const skillsPageMock = {
      id: generateString(),
      title: generateString(),
      description: generateString(),
      user_id: userMock.id
    }

    await createSkillsPageUseCase.execute(skillsPageMock)
    const response = await request(app)
      .get('/skills-page')
      .send({
        domain: userMock.domain
      })

    expect(response.status).toBe(200)
    expect(response.body).toEqual(skillsPageMock)
  })
})
