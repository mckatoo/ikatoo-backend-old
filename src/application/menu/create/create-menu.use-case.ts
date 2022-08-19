import { Menu, MenuItem } from "@domain/menu/menu.entity";
import { MenuRepositoryInterface } from "@domain/menu/menu.repository";

type CreateMenuInput = {
  name: string
  items: MenuItem[]
  user_id: string
};

type CreateMenuOutput = {
  id: string
  name: string
  items: MenuItem[]
  user_id: string
};

export class CreateMenuUseCase {
  constructor(private menuRepository: MenuRepositoryInterface) {}

  async execute(input: CreateMenuInput): Promise<CreateMenuOutput> {
    const menu = Menu.create(input);
    await this.menuRepository.create(menu);

    return menu.toJson();
  }
}
