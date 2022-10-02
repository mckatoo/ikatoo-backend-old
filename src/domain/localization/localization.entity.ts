import { randomUUID } from 'crypto'

export interface LocalizationProps {
  id?: string
  latitude: string
  longitude: string
  user_id: string
}

export class Localization {
  readonly props: Required<LocalizationProps>

  private constructor (props: LocalizationProps) {
    this.props = {
      ...props,
      latitude: props.latitude ?? '',
      longitude: props.longitude ?? '',
      id: props.id ?? randomUUID()
    }
  }

  static create (props: LocalizationProps) {
    return new Localization(props)
  }

  get id (): string {
    return this.props.id
  }

  get latitude (): string {
    return this.props.latitude
  }

  get longitude (): string {
    return this.props.longitude
  }

  get user_id (): string {
    return this.props.user_id
  }

  toJson () {
    return this.props
  }
}
