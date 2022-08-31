import { Menu, MenuItem, MenuProps } from '@domain/menu/menu.entity'
import { MenuRepositoryInterface } from '@domain/menu/menu.repository'

export class MenuMemoryRepository implements MenuRepositoryInterface {
  private menu: Menu[] = []

  async rename (newName: string, menuId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async removeItem (itemId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async updateItem (itemId: string, item: MenuItem): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async get (userId: string, name: string): Promise<MenuProps> {
    const menu = this.menu.find(
      (menu) => menu.user_id === userId && menu.name === name
    )
    if (menu == null) throw new Error('Menu not found')

    return await Promise.resolve(menu.toJson())
  }

  async insertItem (item: MenuItem, menuId: string): Promise<void> {
    const menu = this.menu.find(({ id }) => id === menuId)
    !(menu == null) && menu.items.push(item)
  }

  async create (menu: Menu): Promise<void> {
    this.menu = [...this.menu, menu]
  }

  async getAll (): Promise<Menu[]> {
    return await Promise.resolve(this.menu)
  }
}
