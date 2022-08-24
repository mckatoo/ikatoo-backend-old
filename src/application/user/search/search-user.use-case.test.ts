import { UserMemoryRepository } from "@infra/db/user/inMemory/user-memory.repository";

import { CreateUserUseCase } from "../create/create-user.use-case";
import { SearchUserUseCase } from "./search-user.use-case";

describe("Search User use-case Test", () => {
  const repository = new UserMemoryRepository();
  const createUseCase = new CreateUserUseCase(repository);
  const searchUseCase = new SearchUserUseCase(repository);

  it("should search users with last name", async () => {
    const users = [
      {
        name: "User Test Rakuna",
        email: "rakuna@user.com",
        username: "rakuna",
        password: "1234521312",
      },
      {
        name: "User2 Test Rakuna",
        email: "matata@user.com",
        username: "matata",
        password: "1234521312",
      },
    ];
    await createUseCase.execute(users[0]);
    await createUseCase.execute(users[1]);
    const output = await searchUseCase.byNamePart("rakuna");

    expect(output).toHaveLength(2);
    expect(output).toStrictEqual(
      users.map(({ name, email, username }) => ({ name, email, username }))
    );
  });
});
