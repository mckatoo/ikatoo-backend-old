import { ProjectProps } from './project.entity'

export type ProjectWithId = ProjectProps & { id?: string }

export interface ProjectRepositoryInterface {
  create: (project: ProjectWithId) => Promise<void>
  getByUserId: (userId: string) => Promise<ProjectWithId[]>
  getAll: () => Promise<ProjectWithId[]>
  searchByTitle: (partialTitle: string) => Promise<ProjectWithId[]>
}
