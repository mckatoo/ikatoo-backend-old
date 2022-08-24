import { User, UserProps } from "@domain/user/user.entity";

import { UserMemoryRepository } from "./user-memory.repository";

describe("User in Memory Repository", () => {
  const repository = new UserMemoryRepository();

  it("should create a new user", async () => {
    const userData: UserProps = {
      name: "will king",
      email: "test@test.com",
      username: "user1",
      password: "pass",
    };
    const user = new User(userData);
    const beforeInsert = await repository.getAll();
    expect(beforeInsert).toHaveLength(0);

    await repository.create(user);
    const afterInsert = await repository.getAll();
    expect(afterInsert).toHaveLength(1);
    expect(afterInsert).toStrictEqual([user.toJson()]);
  });

  it("should create a new user with id", async () => {
    const userData: UserProps = {
      name: "user with id",
      email: "user123@test.com",
      username: "user123",
      password: "pass",
    };
    const user = new User(userData, "id_test_id");
    const beforeInsert = await repository.getAll();
    expect(beforeInsert).toHaveLength(1);

    await repository.create(user);
    const afterInsert = await repository.getAll();
    expect(afterInsert[1]).toStrictEqual({
      ...user.toJson(),
      id: "id_test_id",
    });
  });

  it("should get a user by username", async () => {
    const userData: UserProps = {
      name: "admin",
      email: "test2@test.com",
      username: "user2",
      password: "pass",
    };
    const user = new User(userData);
    const userBeforeInsert = await repository.getAll();

    await repository.create(user);
    const userAfterInsert = await repository.getAll();

    expect(userAfterInsert).toStrictEqual([...userBeforeInsert, user.toJson()]);
    expect(userAfterInsert).toHaveLength(3);
    const existentUser = await repository.getByUsername("user2");
    expect(existentUser).toStrictEqual({
      id: existentUser.id,
      name: "admin",
      email: "test2@test.com",
      username: "user2",
      password: "pass",
    });
  });

  it("should get a user by email", async () => {
    const exist = await repository.getByEmail("test2@test.com");

    expect(exist).toStrictEqual({
      id: exist.id,
      name: "admin",
      email: "test2@test.com",
      username: "user2",
      password: "pass",
    });
  });

  it("should find 2 users with same last name", async () => {
    const userData: UserProps = {
      name: "petter king",
      email: "test3@test.com",
      username: "user3",
      password: "pass",
    };
    const user = new User(userData);
    await repository.create(user);

    const users = await repository.searchByName("king");

    expect(await repository.count()).toBe(4);
    expect(users).toHaveLength(2);
    expect(users).toStrictEqual([
      {
        id: users[0].id,
        name: "will king",
        email: "test@test.com",
        username: "user1",
        password: "pass",
      },
      {
        id: users[1].id,
        ...userData,
      },
    ]);
  });
});
