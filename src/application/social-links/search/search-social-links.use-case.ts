import { SocialLinksRepositoryInterface, SocialLinksWithId } from '@domain/social-links/social-links.repository'

export class SearchSocialLinksUseCase {
  constructor (
    private readonly repository: SocialLinksRepositoryInterface
  ) {}

  async execute (partialName: string): Promise<SocialLinksWithId[]> {
    const projects = await this.repository.searchByName(partialName)
    return projects
  }
}
