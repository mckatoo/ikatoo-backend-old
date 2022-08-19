import { Menu, MenuItem } from "@domain/menu/menu.entity";
import { MenuRepositoryInterface } from "@domain/menu/menu.repository";

export class MenuMemoryRepository implements MenuRepositoryInterface {
  private menu: Menu[] = [];

  async insertItem(item: MenuItem, menuId: string): Promise<void> {
    const menu = this.menu.find(({ id }) => id === menuId);
    !!menu && menu.items.push(item);
  }

  async create(menu: Menu): Promise<void> {
    this.menu = [...this.menu, menu];
  }

  async getAll(): Promise<Menu[]> {
    return this.menu;
  }

  async count(): Promise<number> {
    return Promise.resolve(this.menu.length);
  }
}
