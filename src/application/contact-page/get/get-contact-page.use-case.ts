import { NotFoundError } from '@application/helpers/api-erros'
import { ContactPageProps } from '@domain/contact-page/contact-page.entity'
import { ContactPageRepositoryInterface } from '@domain/contact-page/contact-page.repository'
import { UserRepository } from '@infra/db/user'

export class GetContactPageUseCase {
  constructor (private readonly contactPageRepository: ContactPageRepositoryInterface) {}

  async getByUserId (userId: string): Promise<ContactPageProps> {
    const contactPage = await this.contactPageRepository.getByUserId(userId)

    return contactPage
  }

  async getByDomain (domain: string): Promise<ContactPageProps> {
    const userRepository = new UserRepository()
    const user = await userRepository.getByDomain(domain)
    if (user?.id == null) throw new NotFoundError('Domain not found')

    const contactPage = await this.contactPageRepository.getByUserId(user.id)

    return contactPage
  }
}
