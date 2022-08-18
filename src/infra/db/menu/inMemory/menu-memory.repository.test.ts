import { Menu, MenuProps } from "@domain/menu/menu.entity";
import { MenuMemoryRepository } from "./menu-memory.repository";

describe("Menu in Memory Repository", () => {
  const repository = new MenuMemoryRepository();

  it("should insert a new menu", async () => {
    const menuData: MenuProps = {
      label: "label to link",
      to: "url"
    };
    const menu = new Menu(menuData);
    const beforeInsert = await repository.getAll();
    expect(beforeInsert).toHaveLength(0);

    await repository.insert(menu);
    const afterInsert = await repository.getAll();
    expect(afterInsert).toHaveLength(1);
    expect(afterInsert).toStrictEqual([menu]);
  });

  it("should get a menu", async () => {
    const menuData: MenuProps = {
      label: "new label to link",
      to: "new url"
    }
    const menu = new Menu(menuData);
    const menuBeforeInsert = await repository.getAll()

    await repository.insert(menu);
    const menuAfterInsert = await repository.getAll()

    expect(menuAfterInsert).toStrictEqual([
      ...menuBeforeInsert,
      menu
    ]);
  })
});
