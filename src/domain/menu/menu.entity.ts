import { randomUUID } from 'crypto'

export interface MenuItem {
  label: string
  to: string
}

export interface MenuProps {
  name: string
  items: MenuItem[]
  user_id: string
}

export class Menu {
  readonly id: string
  props: Required<MenuProps>

  constructor (props: MenuProps, id?: string) {
    this.id = id ?? randomUUID()

    if (props === undefined) throw new Error('Props required on contructor')

    this.props = {
      ...props,
      name: props.name ?? '',
      items: props.items,
      user_id: props.user_id
    }
  }

  static create (props: MenuProps, id?: string) {
    return new Menu(props, id)
  }

  updateName (name: string) {
    this.props.name = name
  }

  updateItems (items: MenuItem[]) {
    this.props.items = items
  }

  get items (): MenuItem[] {
    return this.props.items
  }

  get name (): string {
    return this.props.name
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
