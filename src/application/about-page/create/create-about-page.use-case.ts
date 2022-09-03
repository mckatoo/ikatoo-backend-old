import { AboutPage, AboutPageProps } from '@domain/about/about-page.entity'
import { AboutPageRepositoryInterface } from '@domain/about/about-page.repository'

type CreateAboutPageInput = AboutPageProps & { id?: string }

type CreateAboutPageOutput = AboutPageProps & { id: string }

export class CreateAboutPageUseCase {
  constructor (private readonly aboutPageRepository: AboutPageRepositoryInterface) {}

  async execute (input: CreateAboutPageInput): Promise<CreateAboutPageOutput> {
    const aboutPage = AboutPage.create(input, input.id)
    await this.aboutPageRepository.create(aboutPage)

    return aboutPage.toJson()
  }
}
