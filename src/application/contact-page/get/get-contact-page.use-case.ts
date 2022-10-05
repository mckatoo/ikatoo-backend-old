import { ContactPageProps } from '@domain/contact-page/contact-page.entity'
import { ContactPageRepositoryInterface } from '@domain/contact-page/contact-page.repository'

export class GetContactPageUseCase {
  constructor (private readonly contactPageRepository: ContactPageRepositoryInterface) {}

  async getByUserId (userId: string): Promise<ContactPageProps> {
    const contactPage = await this.contactPageRepository.getByUserId(userId)

    return contactPage
  }

  async getByDomain (domain: string): Promise<ContactPageProps> {
    const contactPage = await this.contactPageRepository.getByDomain(domain)

    return contactPage
  }
}
