import { randomUUID } from 'crypto'

export interface ContactPageProps {
  id?: string
  title: string
  description: string
  user_id: string
}

export class ContactPage {
  readonly props: Required<ContactPageProps>

  private constructor (props: ContactPageProps) {
    this.props = {
      ...props,
      id: props.id ?? randomUUID()
    }
  }

  static create (props: ContactPageProps) {
    return new ContactPage(props)
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
