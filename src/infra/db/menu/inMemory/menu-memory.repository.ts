import { Menu, MenuItem, MenuProps } from "@domain/menu/menu.entity";
import { MenuRepositoryInterface } from "@domain/menu/menu.repository";

export class MenuMemoryRepository implements MenuRepositoryInterface {
  private menu: Menu[] = [];

  async rename(new_name: string, menu_id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async removeItem(item_id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async updateItem(item_id: string, item: MenuItem): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async get(user_id: string, name: string): Promise<MenuProps> {
    const menu = this.menu.find(
      (menu) => menu.user_id == user_id && menu.name == name
    );
    if (!menu) throw new Error("Menu not found");

    return Promise.resolve(menu.toJson());
  }

  async insertItem(item: MenuItem, menuId: string): Promise<void> {
    const menu = this.menu.find(({ id }) => id === menuId);
    !!menu && menu.items.push(item);
  }

  async create(menu: Menu): Promise<void> {
    this.menu = [...this.menu, menu];
  }

  async getAll(): Promise<Menu[]> {
    return Promise.resolve(this.menu);
  }

  async count(): Promise<number> {
    return Promise.resolve(this.menu.length);
  }
}
