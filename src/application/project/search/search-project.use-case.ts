import { ProjectRepositoryInterface, ProjectWithId } from '@domain/projects/project.repository'

export class SearchProjectUseCase {
  constructor (
    private readonly repository: ProjectRepositoryInterface
  ) {}

  async execute (title: string): Promise<ProjectWithId[]> {
    const projects = await this.repository.searchByTitle(title)
    return projects
  }
}
