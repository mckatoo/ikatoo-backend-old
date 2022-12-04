import { AboutPageRepositoryInterface, AboutPageWithId } from '@domain/about/about-page.repository'

export class GetAboutPageUseCase {
  constructor (private readonly aboutPageRepository: AboutPageRepositoryInterface) {}

  async getByUserId (userId: string): Promise<AboutPageWithId> {
    const aboutPage = await this.aboutPageRepository.getByUserId(userId)

    return aboutPage
  }
}
