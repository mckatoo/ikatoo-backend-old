import { randomUUID } from 'crypto'

export interface RefreshTokenProps {
  id?: string
  expiresIn: number
  userId: string
}

export class RefreshToken {
  readonly props: Required<RefreshTokenProps>

  private constructor (props: RefreshTokenProps) {
    this.props = {
      ...props,
      id: props.id ?? randomUUID()
    }
  }

  static create (props: RefreshTokenProps) {
    return new RefreshToken(props)
  }

  get id (): string {
    return this.props.id
  }

  get expiresIn (): number {
    return this.props.expiresIn
  }

  get userId (): string {
    return this.props.userId
  }

  toJson () {
    return this.props
  }
}
