import { randomUUID } from 'crypto'

export interface SkillProps {
  title: string
  weight: number
  user_id: string
}

export class Skill {
  readonly id: string
  props: Required<SkillProps>

  private constructor (props?: SkillProps, id?: string) {
    this.id = id ?? randomUUID()

    if (props == null) throw new Error('Props required on contructor')

    this.props = props
  }

  static create (props?: SkillProps, id?: string) {
    return new Skill(props, id)
  }

  updateTitle (title: string) {
    this.props.title = title
  }

  updateWeight (weight: number) {
    this.props.weight = weight
  }

  get title (): string {
    return this.props.title
  }

  get weight (): number {
    return this.props.weight
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
