import { Menu } from "./menu.entity";

export interface MenuRepositoryInterface {
  insert(aboutPage: Menu): Promise<void>;
  getAll(): Promise<Menu[]>;
}
