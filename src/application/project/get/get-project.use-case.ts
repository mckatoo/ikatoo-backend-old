import { ProjectRepositoryInterface, ProjectWithId } from '@domain/projects/project.repository'

export class GetProjectUseCase {
  constructor (private readonly repository: ProjectRepositoryInterface) {}

  async byUserId (userId: string): Promise<ProjectWithId[]> {
    const projects = await this.repository.getByUserId(userId)

    return projects
  }
}
