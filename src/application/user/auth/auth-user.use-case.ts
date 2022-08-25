import {
  UserRepositoryInterface,
  UserWithId,
} from "@domain/user/user.repository";
import { comparePassword } from "@infra/hashing-password";
import { jwtSign } from "@infra/jwt";

type AuthUserOutput = {
  accessToken: string;
  refreshToken: string;
};

const validateCredentials = async (user: UserWithId, password: string) => {
  const isValid = await comparePassword(password, user.password);
  if (!isValid) throw new Error("Credentials invalid.");

  const accessToken = await jwtSign({
    id: user.id,
    expireTime: 60,
  });
  const refreshToken = await jwtSign({
    id: user.id,
    expireTime: 600,
  });

  return { accessToken, refreshToken };
};

export class AuthUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async authByUsername(
    username: string,
    password: string
  ): Promise<AuthUserOutput> {
    const user = await this.userRepository.getByUsername(username);
    return validateCredentials(user, password);
  }
  
  async authByEmail(email: string, password: string): Promise<AuthUserOutput> {
    const user = await this.userRepository.getByEmail(email);
    return validateCredentials(user, password);
  }
  
  // async authByToken(refreshToken: string): Promise<AuthUserOutput> {

    
  //   const user = await this.userRepository.getByUsername(username);
  //   return validateCredentials(user, password);
  // }
}
