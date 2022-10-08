import { CreateProjectUseCase } from '@application/project/create/create-project.use-case'
import { CreateUserUseCase } from '@application/user/create/create-user.use-case'
import { ProjectWithId } from '@domain/projects/project.repository'
import { ProjectRepository } from '@infra/db/project'
import { UserRepository } from '@infra/db/user'
import { generateString } from '@infra/generate'
import request from 'supertest'
import app from '../../app'

const projectRepository = new ProjectRepository()
const createProjectUseCase = new CreateProjectUseCase(projectRepository)

const userRepository = new UserRepository()
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

describe('Express - Project', () => {
  it('should not create projects without authorization', async () => {
    const response = await request(app)
      .post('/project')
      .send({
        title: generateString(),
        sub_title: generateString(),
        description: generateString(),
        github_link: generateString(),
        snapshot: generateString(),
        user_id: generateString()
      })

    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Token is missing')
  })

  it('should create projects for a user', async () => {
    const response = await request(app)
      .post('/project')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: generateString(),
        sub_title: generateString(),
        description: generateString(),
        github_link: generateString(),
        snapshot: generateString(),
        user_id: generateString()
      })

    expect(response.status).toBe(201)
  })

  it('should get projects for a user', async () => {
    const user = await createUserUseCase.execute({
      name: generateString(),
      username: generateString(),
      email: `${generateString()}@mail.com`,
      password: generateString(),
      domain: `${generateString()}.com`
    })

    let projects: ProjectWithId[] = []
    for (let i = 0; i < 3; i++) {
      const newProject = await createProjectUseCase.execute({
        title: generateString(),
        sub_title: generateString(),
        description: generateString(),
        github_link: generateString(),
        snapshot: generateString(),
        user_id: user?.id ?? ''
      })
      projects = [...projects, newProject]
    }

    const response = await request(app)
      .get(`/project/user/${user?.id ?? ''}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: generateString(),
        sub_title: generateString(),
        description: generateString(),
        github_link: generateString(),
        snapshot: generateString(),
        user_id: generateString()
      })

    expect(response.status).toBe(200)
    expect(response.body).toEqual(projects)
  })

  it('should get projects for a user thrown access token', async () => {
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

    let projects: ProjectWithId[] = []
    for (let i = 0; i < 3; i++) {
      const newProject = await createProjectUseCase.execute({
        title: generateString(),
        sub_title: generateString(),
        description: generateString(),
        github_link: generateString(),
        snapshot: generateString(),
        user_id: user?.id ?? ''
      })
      projects = [...projects, newProject]
    }

    const response = await request(app)
      .get('/project')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: generateString(),
        sub_title: generateString(),
        description: generateString(),
        github_link: generateString(),
        snapshot: generateString(),
        user_id: generateString()
      })

    expect(response.status).toBe(200)
    expect(response.body).toEqual(projects)
  })
})
