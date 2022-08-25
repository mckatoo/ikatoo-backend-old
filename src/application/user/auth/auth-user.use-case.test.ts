import { User } from "@domain/user/user.entity";
import { UserRepository } from "@infra/db/user";
import { CreateUserUseCase } from "../create/create-user.use-case";

import { AuthUserUseCase } from "./auth-user.use-case";

describe("Auth User use-case Test", () => {
  const repository = new UserRepository();
  const authUseCase = new AuthUserUseCase(repository);
  const createUseCase = new CreateUserUseCase(repository);

  it("should authenticate a new user using username and password", async () => {
    const user = await createUseCase.execute({
      name: "Auth User",
      email: "user@auth.com",
      username: "auth-user",
      password: "123passauth",
    });
    const tokens = await authUseCase.authByUsername(
      user.username,
      "123passauth"
    );

    expect(tokens).toHaveProperty("accessToken");
    expect(tokens).toHaveProperty("refreshToken");
  });
});
