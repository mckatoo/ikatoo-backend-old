import { Menu, MenuItem, MenuProps } from "./menu.entity";

export interface MenuRepositoryInterface {
  create(menu: Menu): Promise<void>;
  rename(new_name: string, menu_id: string): Promise<void>;
  insertItem(item: MenuItem, menu_id: string): Promise<void>;
  removeItem(item_id: string): Promise<void>;
  updateItem(item_id: string, item: MenuItem): Promise<void>
  get(userId: string, name: string): Promise<MenuProps>;
}
