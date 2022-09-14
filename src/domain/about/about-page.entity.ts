import { SkillProps } from '@domain/skill/skill.entity'
import { randomUUID } from 'crypto'

export interface ImageProps {
  src: string
  alt: string
}

export interface AboutPageProps {
  skills?: SkillProps[]
  title: string
  description: string
  image?: ImageProps
  user_id: string
}

export class AboutPage {
  readonly id: string
  props: Required<AboutPageProps>

  private constructor (props?: AboutPageProps, id?: string) {
    this.id = id ?? randomUUID()

    if (props == null) throw new Error('Props required on contructor')

    this.props = {
      ...props,
      skills: props.skills ?? [],
      image: props.image ?? { src: '', alt: '' }
    }
  }

  static create (props?: AboutPageProps, id?: string) {
    return new AboutPage(props, id)
  }

  updateSkills (skills: SkillProps[]) {
    this.props.skills = skills
  }

  updateTitle (title: string) {
    this.props.title = title
  }

  updateDescription (description: string) {
    this.props.description = description
  }

  updateImage (image: ImageProps) {
    this.props.image = image
  }

  get title (): string {
    return this.props.title
  }

  get description (): string {
    return this.props.description
  }

  get skills (): SkillProps[] {
    return this.props.skills
  }

  get image (): ImageProps {
    return this.props.image
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
