import { clearUserSqliteRepository } from "@infra/db/sqlite";
import { UserRepository } from "@infra/db/user";

import { CreateUserUseCase } from "./create-user.use-case";

describe("Create User use-case Test", () => {
  const repository = new UserRepository();
  const createUseCase = new CreateUserUseCase(repository);

  beforeAll(async () => {
    await clearUserSqliteRepository();
  });

  afterAll(async () => {
    await clearUserSqliteRepository();
  });

  it("should create a new user without id", async () => {
    expect(await repository.getAll()).toHaveLength(0);

    const output = await createUseCase.execute({
      name: "User Test",
      email: "user@test.com",
      username: "usertest",
      password: "asdfl",
    });
    const expectedUser = await repository.getByUsername(output.username);

    expect(output).toStrictEqual({
      id: expectedUser.id,
      name: "User Test",
      email: "user@test.com",
      username: "usertest",
    });
    expect(output).not.toHaveProperty("password");
    expect(await repository.getAll()).toHaveLength(1);
  });

  it("should create a new user with id", async () => {
    expect(await repository.getAll()).toHaveLength(1);

    const output = await createUseCase.execute({
      id: "test_id",
      name: "User Test",
      email: "usertest234@test.com",
      username: "usertest234",
      password: "asdfl",
    });

    expect(output).toStrictEqual({
      id: "test_id",
      name: "User Test",
      email: "usertest234@test.com",
      username: "usertest234",
    });
    expect(output).not.toHaveProperty("password");
    expect(await repository.getAll()).toHaveLength(2);
  });
});
