import {
  SocialLinksRepositoryInterface,
  SocialLinksWithId
} from '@domain/social-links/social-links.repository'
import { UserRepository } from '@infra/db/user'

export class GetSocialLinksUseCase {
  constructor (private readonly repository: SocialLinksRepositoryInterface) {}

  async byUserId (userId: string): Promise<SocialLinksWithId[]> {
    const socialLinks = await this.repository.getByUserId(userId)

    return socialLinks
  }

  async byDomain (domain: string): Promise<SocialLinksWithId[]> {
    const userRepository = new UserRepository()
    try {
      const user = await userRepository.getByDomain(domain)
      // if (user?.id == null) throw new NotFoundError('Domain not found')
      if (user?.id == null) return []
      const socialLinks = await this.repository.getByUserId(user.id)
      return socialLinks
    } catch (error) {
      if (error instanceof Error && error.message !== 'No data returned from the query.') {
        throw new Error(error.message)
      }
    }
    return []
  }
}
