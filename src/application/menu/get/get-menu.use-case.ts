import { MenuItem } from '@domain/menu/menu.entity'
import { MenuRepositoryInterface } from '@domain/menu/menu.repository'

interface GetMenuOutput {
  name: string
  items: MenuItem[]
  user_id: string
}

export class GetMenuUseCase {
  constructor (private readonly menuRepository: MenuRepositoryInterface) {}

  async execute (userId: string, name: string): Promise<GetMenuOutput> {
    const menu = await this.menuRepository.get(userId, name)

    return menu
  }
}
