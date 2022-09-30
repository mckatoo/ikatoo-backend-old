import { randomUUID } from 'crypto'

export interface ProjectProps {
  id?: string
  title: string
  sub_title?: string
  description: string
  github_link?: string
  snapshot?: string
  user_id: string
}

export class Project {
  readonly props: Required<ProjectProps>

  private constructor (props: ProjectProps) {
    this.props = {
      ...props,
      sub_title: props.sub_title ?? '',
      github_link: props.github_link ?? '',
      snapshot: props.snapshot ?? '',
      id: props.id ?? randomUUID()
    }
  }

  static create (props: ProjectProps) {
    return new Project(props)
  }

  get id (): string {
    return this.props.id
  }

  get title (): string {
    return this.props.title
  }

  get sub_title (): string {
    return this.props.sub_title
  }

  get description (): string {
    return this.props.description
  }

  get github_link (): string {
    return this.props.github_link
  }

  get snapshot (): string {
    return this.props.snapshot
  }

  get user_id (): string {
    return this.props.user_id
  }

  toJson () {
    return this.props
  }
}
