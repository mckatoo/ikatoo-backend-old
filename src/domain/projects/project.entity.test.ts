import { generateString } from '@infra/generate'
import { Project, ProjectProps } from './project.entity'

describe('Test Project Test', () => {
  it('constructor without id', () => {
    const projectData: ProjectProps = {
      title: generateString(),
      sub_title: generateString(),
      description: generateString(),
      github_link: generateString(),
      snapshot: generateString(),
      user_id: generateString()
    }
    const project = Project.create(projectData)
    expect(project.toJson()).toStrictEqual({
      id: project.id,
      ...projectData
    })

    expect(project.id).toBeDefined()
  })

  it('should constructor with id', () => {
    const projectData: ProjectProps = {
      id: generateString(),
      title: generateString(),
      sub_title: generateString(),
      description: generateString(),
      github_link: generateString(),
      snapshot: generateString(),
      user_id: generateString()
    }
    const project = Project.create(projectData)

    expect(project.toJson()).toEqual(projectData)
  })
})
