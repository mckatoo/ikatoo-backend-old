import {
  SocialLinksRepositoryInterface,
  SocialLinksWithId
} from '@domain/social-links/social-links.repository'

export class GetSocialLinksUseCase {
  constructor (private readonly repository: SocialLinksRepositoryInterface) {}

  async byUserId (userId: string): Promise<SocialLinksWithId[]> {
    const socialLinks = await this.repository.getByUserId(userId)

    return socialLinks
  }
}
