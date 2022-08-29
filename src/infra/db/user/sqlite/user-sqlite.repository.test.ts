import { UserProps } from "@domain/user/user.entity";
import database from "./database";
import { UserSqliteRepository } from "./user-sqlite.repository";

describe("Sqlite repository", () => {
  it("Should insert user", async () => {
    const repository = new UserSqliteRepository();
    await repository.create({
      name: "Test sqlite",
      username: "test_sqlite",
      email: "test@sqlite.com",
      password: "test123",
    });

    const user = await (await database()).get<UserProps>(
      "select * from users where username = ?",
      "test_sqlite"
    );

    // expect(user?.username).toBe("test_sqlite");
  });
});
