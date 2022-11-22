import { AboutPageRepositoryInterface, AboutPageUpdateType } from '@domain/about/about-page.repository'

export class UpdateAboutPageUseCase {
  constructor (
    private readonly aboutPageRepository: AboutPageRepositoryInterface
  ) {}

  async execute (aboutPage: AboutPageUpdateType) {
    await this.aboutPageRepository.update(aboutPage)
  }
}
