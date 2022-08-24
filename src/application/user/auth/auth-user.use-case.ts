import { UserRepositoryInterface } from "@domain/user/user.repository";

type AuthUserOutput = {
  acessToken: string;
  refreshToken: string;
};

export class AuthUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async authByUsername(
    username: string,
    password: string
  ): Promise<AuthUserOutput> {
    // procurar usuario
    const user = await this.userRepository.getByUsername(username);

    // verificar senha com bcrypt compare
    // emitir accessToken e refreshToken ou throw Error
  }

  async authByEmail(email: string, password: string): Promise<AuthUserOutput> {}
}
