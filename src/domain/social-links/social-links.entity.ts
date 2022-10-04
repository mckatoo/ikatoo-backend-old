import { randomUUID } from 'crypto'

export interface SocialLinksProps {
  id?: string
  name: string
  url: string
  icon_url: string
  user_id: string
}

export class SocialLinks {
  readonly props: Required<SocialLinksProps>

  private constructor (props: SocialLinksProps) {
    this.props = {
      ...props,
      name: props.name,
      url: props.url,
      icon_url: props.icon_url,
      user_id: props.user_id,
      id: props.id ?? randomUUID()
    }
  }

  static create (props: SocialLinksProps) {
    return new SocialLinks(props)
  }

  get id (): string {
    return this.props.id
  }

  get name (): string {
    return this.props.name
  }

  get url (): string {
    return this.props.url
  }

  get icon_url (): string {
    return this.props.icon_url
  }

  get user_id (): string {
    return this.props.user_id
  }

  toJson () {
    return this.props
  }
}
