import { UserProps } from '@domain/user/user.entity'
import { UserRepositoryInterface } from '@domain/user/user.repository'

type SearchUserOutput = Omit<UserProps, 'password'>

export class SearchUserUseCase {
  constructor (private readonly userRepository: UserRepositoryInterface) {}

  async byNamePart (namePart: string): Promise<SearchUserOutput[]> {
    const users = await this.userRepository.searchByName(namePart)

    return users.map(({ name, username, email }) => ({
      name,
      username,
      email
    }))
  }
}
