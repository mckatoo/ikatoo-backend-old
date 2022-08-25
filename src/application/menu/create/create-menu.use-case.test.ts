import { MenuRepository } from "@infra/db/menu";

import { CreateMenuUseCase } from "./create-menu.use-case";

describe("Create Menu use-case Test", () => {
  const repository = new MenuRepository();
  const createUseCase = new CreateMenuUseCase(repository);

  it("should create a new menu", async () => {
    expect(await repository.count()).toBe(0);

    const output = await createUseCase.execute({
      name: "public",
      items: [
        { label: "first item", to: "first/url" },
        { label: "second item", to: "second/url" },
      ],
      user_id: "other_user_id",
    });
    const expectedMenu = await repository.get("other_user_id", "public");
    expect(output).toStrictEqual(expectedMenu);
    expect(await repository.count()).toBe(1);
  });

  it("should create a new menu with id", async () => {
    expect(await repository.count()).toBe(1);

    const output = await createUseCase.execute({
      id: "teste_id",
      name: "public",
      items: [
        { label: "first item", to: "first/url" },
        { label: "second item", to: "second/url" },
      ],
      user_id: "userId-test",
    });
    const expectedMenu = await repository.get("userId-test", "public");

    expect(output).toHaveProperty("id", "teste_id");
    expect(output).toStrictEqual(expectedMenu);
    expect(await repository.count()).toBe(2);
  });
});
