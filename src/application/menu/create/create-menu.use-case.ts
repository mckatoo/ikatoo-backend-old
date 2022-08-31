import { Menu, MenuItem, MenuProps } from '@domain/menu/menu.entity'
import { MenuRepositoryInterface } from '@domain/menu/menu.repository'

type CreateMenuInput = MenuProps & { id?: string }

interface CreateMenuOutput {
  id: string
  name: string
  items: MenuItem[]
  user_id: string
}

export class CreateMenuUseCase {
  constructor (private readonly menuRepository: MenuRepositoryInterface) {}

  async execute (input: CreateMenuInput): Promise<CreateMenuOutput> {
    const menu = Menu.create({ ...input }, input.id)
    await this.menuRepository.create(menu)

    return menu.toJson()
  }
}
