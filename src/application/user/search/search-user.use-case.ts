import { UserProps } from "@domain/user/user.entity";
import { UserRepositoryInterface } from "@domain/user/user.repository";

type SearchUserOutput = Omit<UserProps, "password">;

export class SearchUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async byNamePart(name_part: string): Promise<SearchUserOutput[]> {
    const users = await this.userRepository.searchByName(name_part);

    return users.map(({ name, username, email }) => ({
      name,
      username,
      email,
    }));
  }
}
