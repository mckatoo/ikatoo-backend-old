import { ConflictError } from '@application/helpers/api-erros'
import { Project, ProjectProps } from '@domain/projects/project.entity'
import { ProjectRepositoryInterface, ProjectWithId } from '@domain/projects/project.repository'

type CreateProjectInput = ProjectProps & { id?: string }

export class CreateProjectUseCase {
  constructor (private readonly repository: ProjectRepositoryInterface) {}

  async execute (input: CreateProjectInput): Promise<Required<ProjectWithId>> {
    const userExists = await this.repository.getByUserId(input.user_id)
    const projectExists = userExists.find(project => project.title === input.title)
    if (projectExists != null) throw new ConflictError('This project already exists for this user')

    const project = Project.create(input)
    await this.repository.create(project)

    return project.toJson()
  }
}
