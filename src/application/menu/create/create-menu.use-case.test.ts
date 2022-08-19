import { Menu, MenuProps } from "@domain/menu/menu.entity";
import { MenuRepository } from "@infra/db/menu";
import { randomUUID } from "crypto";
import { CreateMenuUseCase } from "./create-menu.use-case";

describe("Create Menu use-case Test", () => {
  it("should create a new menu", async () => {
    const repository = new MenuRepository();
    const createUseCase = new CreateMenuUseCase(repository);
    const menu = new Menu({
      name: "public",
      items: [
        { label: "first item", to: "first/url" },
        { label: "second item", to: "second/url" },
      ],
      user_id: randomUUID(),
    });
    
    expect(await repository.count()).toBe(0);

    const output = await createUseCase.execute(menu);
    const expectedMenu = await repository.get(menu.user_id, "public");
    expect(output).toStrictEqual(expectedMenu);
    expect(await repository.count()).toBe(1);
  });
});
