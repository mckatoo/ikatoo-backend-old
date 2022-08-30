import { UserRepository } from "@infra/db/user";
import { verify } from "@infra/jwt";

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
    const { accessToken, refreshToken } = await authUseCase.authByUsername(
      user.username,
      "123passauth"
    );

    expect(verify(accessToken)).toBeDefined();
    expect(verify(refreshToken)).toBeDefined();
  });

  it("should authenticate a user using email and password", async () => {
    const { accessToken, refreshToken } = await authUseCase.authByEmail(
      "user@auth.com",
      "123passauth"
    );

    expect(verify(accessToken)).toBeDefined();
    expect(verify(refreshToken)).toBeDefined();
  });

  it("should fail on authenticate a user using invalid username", async () => {
    const token = authUseCase.authByUsername("fail", "123passauth");

    await expect(token).rejects.toThrowError("User not found");
  });

  it("should fail on authenticate a user using invalid email", async () => {
    const token = authUseCase.authByEmail("fail@auth.com", "123passauth");

    await expect(token).rejects.toThrowError("User not found");
  });
});
