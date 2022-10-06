import { NotFoundError } from '@application/helpers/api-erros'
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

  async byDomain (domain: string): Promise<SocialLinksWithId[]> {
    try {
      const socialLinks = await this.repository.getByDomain(domain)

      return socialLinks
    } catch (error) {
      if (error instanceof Error && error.message === 'Domain not found') {
        throw new NotFoundError('Not found social links for this domain')
      }
    }
    return []
  }
}
