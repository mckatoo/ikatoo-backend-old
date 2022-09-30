import { ProjectRepositoryInterface, ProjectWithId } from '@domain/projects/project.repository'
import { randomUUID } from 'crypto'

import database from './database'

export class ProjectsSqliteRepository implements ProjectRepositoryInterface {
  async create (project: ProjectWithId): Promise<void> {
    const db = await database()

    await db.run(
      'insert into projects values(?,?,?,?,?,?,?)',
      project.id ?? randomUUID(),
      project.title,
      project.sub_title,
      project.description,
      project.github_link,
      project.snapshot,
      project.user_id
    )

    await db.close()
  }

  async getByUserId (userId: string): Promise<ProjectWithId[]> {
    const db = await database()
    const projects = await db.all<ProjectWithId[]>(
      'select * from projects where user_id = $userId',
      {
        $userId: userId
      }
    )
    await db.close()

    return projects
  }

  async getAll (): Promise<ProjectWithId[]> {
    const db = await database()
    const allProject = await db.all<ProjectWithId[]>(
      'select * from projects'
    )
    await db.close()

    if (allProject == null) throw new Error('Projects not found')

    return allProject
  }

  async searchByTitle (partialTitle: string): Promise<ProjectWithId[]> {
    const db = await database()
    const projects = await db.all<ProjectWithId[]>(
      `select * from projects where title like '%${partialTitle}%'`
    )
    await db.close()

    if (projects == null) throw new Error('Projects not found')

    return projects
  }
}
