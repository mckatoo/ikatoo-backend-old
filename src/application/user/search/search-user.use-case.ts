import {
  UserRepositoryInterface,
  UserWithId
} from '@domain/user/user.repository'

type SearchUserOutput = Omit<UserWithId, 'password'>

export class SearchUserUseCase {
  constructor (private readonly userRepository: UserRepositoryInterface) {}

  async byNamePart (namePart: string): Promise<SearchUserOutput[]> {
    const users = await this.userRepository.searchByName(namePart)

    return users.map(
      ({
        id,
        name,
        username,
        email,
        is_admin: isAdmin,
        avatar_url: avatarUrl,
        avatar_alt: avatarAlt
      }) => ({
        id,
        name,
        username,
        email,
        is_admin: isAdmin,
        avatar_url: avatarUrl,
        avatar_alt: avatarAlt
      })
    )
  }
}
