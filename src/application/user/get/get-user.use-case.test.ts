import { UserMemoryRepository } from '@infra/db/user/inMemory/user-memory.repository';

import { CreateUserUseCase } from '../create/create-user.use-case';
import { GetUserUseCase } from './get-user.use-case';

describe("Get User use-case Test", () => {
  const repository = new UserMemoryRepository();
  const createUseCase = new CreateUserUseCase(repository);
  const getUseCase = new GetUserUseCase(repository);
  
  it("should get a user by email", async () => {
    const user = await createUseCase.execute({
      name: "User Test",
      email: "test@user.com",
      username: "testuser",
      password: "1234521312",
    });
    const output = await getUseCase.byEmail(user.email);

    expect(output).not.toHaveProperty('password');
    expect(output).toStrictEqual(user);
  });

  it("should get a user by username", async () => {
    const user = await createUseCase.execute({
      name: "Username Test",
      email: "username@user.com",
      username: "username_test",
      password: "1234521312",
    });
    const output = await getUseCase.byUsername(user.username);

    expect(output).not.toHaveProperty('password');
    expect(output).toStrictEqual(user);
  });
});
