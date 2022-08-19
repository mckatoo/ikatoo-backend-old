import { Menu, MenuProps } from "@domain/menu/menu.entity";
import { MenuMemoryRepository } from "./menu-memory.repository";
import { randomUUID } from 'crypto';

describe("Menu in Memory Repository", () => {
  const repository = new MenuMemoryRepository();

  it("should insert a new menu", async () => {
    const menuData: MenuProps = {
      name: "public",
      items: [
        {
          label: "label to link",
          to: "url",
        },
      ],
      user_id: randomUUID()
    };
    const menu = new Menu(menuData);
    const beforeInsert = await repository.getAll();
    expect(beforeInsert).toHaveLength(0);

    await repository.create(menu);
    const afterInsert = await repository.getAll();
    expect(afterInsert).toHaveLength(1);
    expect(afterInsert).toStrictEqual([menu]);
  });

  it("should get a menu", async () => {
    const menuData: MenuProps = {
      name: "admin",
      items: [
        {
          label: "new label to link",
          to: "new url",
        },
      ],
      user_id: randomUUID()
    };
    const menu = new Menu(menuData);
    const menuBeforeInsert = await repository.getAll();

    await repository.create(menu);
    const menuAfterInsert = await repository.getAll();

    expect(menuAfterInsert).toStrictEqual([...menuBeforeInsert, menu]);
    expect(await repository.count()).toBe(2);
  });
});
