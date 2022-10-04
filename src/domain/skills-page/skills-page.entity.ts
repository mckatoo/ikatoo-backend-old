import { randomUUID } from 'crypto'

export interface SkillsPageProps {
  id?: string
  title: string
  description: string
  user_id: string
}

export class SkillsPage {
  readonly props: Required<SkillsPageProps>

  private constructor (props: SkillsPageProps) {
    this.props = {
      ...props,
      id: props.id ?? randomUUID()
    }
  }

  static create (props: SkillsPageProps) {
    return new SkillsPage(props)
  }

  get id (): string {
    return this.props.id
  }

  get title (): string {
    return this.props.title
  }

  get description (): string {
    return this.props.description
  }

  get user_id (): string {
    return this.props.user_id
  }

  toJson () {
    return this.props
  }
}
