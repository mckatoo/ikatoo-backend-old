import { randomUUID } from 'crypto'

export interface SkillsPageProps {
  title: string
  description: string
  user_id: string
}

export class SkillsPage {
  readonly id: string
  props: Required<SkillsPageProps>

  private constructor (props?: SkillsPageProps, id?: string) {
    this.id = id ?? randomUUID()

    if (props == null) throw new Error('Props required on contructor')

    this.props = props
  }

  static create (props?: SkillsPageProps, id?: string) {
    return new SkillsPage(props, id)
  }

  updateTitle (title: string) {
    this.props.title = title
  }

  updateDescription (description: string) {
    this.props.description = description
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
    return {
      id: this.id,
      ...this.props
    }
  }
}
