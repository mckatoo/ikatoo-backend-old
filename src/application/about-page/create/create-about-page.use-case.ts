import { AboutPage, AboutPageProps } from '@domain/about/about-page.entity'
import { AboutPageRepositoryInterface, AboutPageWithId } from '@domain/about/about-page.repository'

type CreateAboutPageOutput = AboutPageProps & { id: string }

export class CreateAboutPageUseCase {
  constructor (private readonly aboutPageRepository: AboutPageRepositoryInterface) {}

  async execute (input: AboutPageWithId): Promise<CreateAboutPageOutput> {
    const aboutPage = AboutPage.create(input, input.id)
    await this.aboutPageRepository.create(aboutPage)

    return aboutPage.toJson()
  }
}
