import { AboutPageProps } from '@domain/about/about-page.entity'
import { AboutPageRepositoryInterface } from '@domain/about/about-page.repository'

type GetAboutPageOutput = AboutPageProps & { id: string }

export class GetAboutPageUseCase {
  constructor (private readonly aboutPageRepository: AboutPageRepositoryInterface) {}

  async execute (userId: string): Promise<GetAboutPageOutput> {
    const aboutPage = await this.aboutPageRepository.get(userId)

    return aboutPage.toJson()
  }
}
