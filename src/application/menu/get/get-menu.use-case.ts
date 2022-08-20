import { MenuItem } from "@domain/menu/menu.entity";
import { MenuRepositoryInterface } from "@domain/menu/menu.repository";

type GetMenuOutput = {
  name: string;
  items: MenuItem[];
  user_id: string;
};

export class GetMenuUseCase {
  constructor(private menuRepository: MenuRepositoryInterface) {}

  async execute(user_id: string, name: string): Promise<GetMenuOutput> {
    const menu = await this.menuRepository.get(user_id, name);

    return menu;
  }
}
