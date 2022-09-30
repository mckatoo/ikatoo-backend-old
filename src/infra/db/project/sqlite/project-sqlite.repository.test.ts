import { ProjectWithId } from '@domain/projects/project.repository'
import { generateString } from '@infra/generate'

import database from './database'
import { ProjectsSqliteRepository } from './project-sqlite.repository'

describe('Projects Sqlite repository', () => {
  const repository = new ProjectsSqliteRepository()

  it('Should insert project', async () => {
    const projectData: ProjectWithId = {
      id: generateString(),
      title: `${generateString()} title`,
      sub_title: `${generateString()} sub title`,
      description: generateString(),
      github_link: `https://github.com/repo/${generateString()}`,
      snapshot: generateString(),
      user_id: generateString()
    }
    await repository.create(projectData)

    const db = await database()
    const project = await db.get<ProjectWithId>(
      'select * from projects where id = ?',
      projectData.id
    )

    expect(project).toEqual(projectData)
  })

  it('Should not insert project with existing id', async () => {
    const projectData = {
      id: generateString(),
      title: `${generateString()} title`,
      sub_title: `${generateString()} sub title`,
      description: generateString(),
      github_link: `https://github.com/repo/${generateString()}`,
      snapshot: generateString(),
      user_id: generateString()
    }
    await repository.create(projectData)
    await expect(
      repository.create(projectData)
    ).rejects.toThrowError(/unique/i)
  })

  it('should get projects by user_id', async () => {
    const userId = generateString()
    const projectsData: ProjectWithId[] = [{
      id: generateString(),
      title: `${generateString()} title`,
      sub_title: `${generateString()} sub title`,
      description: generateString(),
      github_link: `https://github.com/repo/${generateString()}`,
      snapshot: generateString(),
      user_id: userId
    }, {
      id: generateString(),
      title: `${generateString()} title`,
      sub_title: `${generateString()} sub title`,
      description: generateString(),
      github_link: `https://github.com/repo/${generateString()}`,
      snapshot: generateString(),
      user_id: userId
    }, {
      id: generateString(),
      title: `${generateString()} title`,
      sub_title: `${generateString()} sub title`,
      description: generateString(),
      github_link: `https://github.com/repo/${generateString()}`,
      snapshot: generateString(),
      user_id: userId
    }]
    for (let index = 0; index < projectsData.length; index++) {
      await repository.create(projectsData[index])
    }

    const projects = await repository.getByUserId(userId)

    expect(projects).toEqual(projectsData)
  })

  it('should search project by title', async () => {
    const commonTitle = generateString()
    const projectsData: ProjectWithId[] = [{
      id: generateString(),
      title: `${generateString()} ${commonTitle}`,
      sub_title: `${generateString()} sub title`,
      description: generateString(),
      github_link: `https://github.com/repo/${generateString()}`,
      snapshot: generateString(),
      user_id: generateString()
    },
    {
      id: generateString(),
      title: `${generateString()} ${commonTitle}`,
      sub_title: `${generateString()} sub title`,
      description: generateString(),
      github_link: `https://github.com/repo/${generateString()}`,
      snapshot: generateString(),
      user_id: generateString()
    },
    {
      id: generateString(),
      title: `${generateString()} ${commonTitle}`,
      sub_title: `${generateString()} sub title`,
      description: generateString(),
      github_link: `https://github.com/repo/${generateString()}`,
      snapshot: generateString(),
      user_id: generateString()
    }]
    for (let index = 0; index < projectsData.length; index++) {
      await repository.create(projectsData[index])
    }
    const projects = await repository.searchByTitle(commonTitle.toUpperCase())
    expect(projects).toEqual(projectsData)
  })
})
