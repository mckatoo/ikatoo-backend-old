import { ProjectWithId } from '@domain/projects/project.repository'
import { ProjectRepository } from '@infra/db/project'
import { generateString } from '@infra/generate'
import { SearchProjectUseCase } from './search-project.use-case'

const repository = new ProjectRepository()
const searchProjectUseCase = new SearchProjectUseCase(repository)

describe('Search Project use-case Test', () => {
  it('should return the array of the projects with same title', async () => {
    const commonTitle = generateString()
    let allProjects: ProjectWithId[] = []
    for (let i = 0; i < 5; i++) {
      const newProject = {
        id: generateString(),
        title: i % 2 === 0 ? commonTitle : generateString(),
        sub_title: generateString(),
        description: generateString(),
        github_link: generateString(),
        snapshot: generateString(),
        user_id: generateString()
      }
      await repository.create(newProject)
      allProjects = [...allProjects, newProject]
    }

    const projects = await searchProjectUseCase.execute(commonTitle)
    const expectedProjects = [allProjects[0], allProjects[2], allProjects[4]]

    expect(projects).toEqual(expectedProjects)
  })
})
