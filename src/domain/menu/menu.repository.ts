import { Menu, MenuItem } from "./menu.entity";

export interface MenuRepositoryInterface {
  create(menu: Menu): Promise<void>;
  insertItem(item: MenuItem, menuId: string): Promise<void>;
  getAll(): Promise<Menu[]>;
}
