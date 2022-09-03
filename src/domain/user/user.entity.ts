import { randomUUID } from 'crypto'

export interface UserProps {
  name: string
  username: string
  password: string
  email: string
  domain: string
}

export class User {
  readonly id: string

  props: Required<UserProps>

  constructor (props: UserProps, id?: string) {
    this.id = id ?? randomUUID()

    if (props === undefined) throw new Error('Props required on contructor')

    this.props = props
  }

  static create (props: UserProps, id?: string) {
    return new User(props, id)
  }

  updateName (name: string) {
    this.props.name = name
  }

  get name (): string {
    return this.props.name
  }

  updateUsername (username: string) {
    this.props.username = username
  }

  get username (): string {
    return this.props.username
  }

  updatePassword (password: string) {
    this.props.password = password
  }

  get password (): string {
    return this.props.password
  }

  updateEmail (email: string) {
    this.props.email = email
  }

  get email (): string {
    return this.props.email
  }

  updateDomain (domain: string) {
    this.props.domain = domain
  }

  get domain (): string {
    return this.props.domain
  }

  toJson () {
    return {
      id: this.id,
      ...this.props
    }
  }
}
