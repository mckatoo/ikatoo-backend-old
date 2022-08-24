import { Menu, MenuProps } from "@domain/menu/menu.entity";
import { MenuRepository } from "@infra/db/menu";
import { randomUUID } from "crypto";
import { CreateMenuUseCase } from "./create-menu.use-case";

describe("Create Menu use-case Test", () => {
  const repository = new MenuRepository();
  const createUseCase = new CreateMenuUseCase(repository);

  it("should create a new menu", async () => {
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

  it("should create a new menu with id", async () => {
    const menu = new Menu({
      name: "public",
      items: [
        { label: "first item", to: "first/url" },
        { label: "second item", to: "second/url" },
      ],
      user_id: randomUUID(),
    });

    expect(await repository.count()).toBe(1);

    const output = await createUseCase.execute(menu);
    const expectedMenu = await repository.get(menu.user_id, "public");

    expect(output).toHaveProperty("id", "teste_id");
    expect(output).toStrictEqual(expectedMenu);
    expect(await repository.count()).toBe(2);
  });
});
