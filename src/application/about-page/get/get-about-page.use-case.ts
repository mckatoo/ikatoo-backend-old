import { NotFoundError } from '@application/helpers/api-erros'
import { AboutPageRepositoryInterface, AboutPageWithId } from '@domain/about/about-page.repository'
import { UserRepository } from '@infra/db/user'

export class GetAboutPageUseCase {
  constructor (private readonly aboutPageRepository: AboutPageRepositoryInterface) {}

  async getByUserId (userId: string): Promise<AboutPageWithId> {
    const aboutPage = await this.aboutPageRepository.getByUserId(userId)

    return aboutPage
  }

  async getByDomain (domain: string): Promise<AboutPageWithId> {
    const userRepository = new UserRepository()
    const user = await userRepository.getByDomain(domain)
    if (user?.id == null) throw new NotFoundError('Domain not found')

    const aboutPage = await this.aboutPageRepository.getByUserId(user.id)

    return aboutPage
  }
}
