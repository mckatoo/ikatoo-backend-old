import { ConflictError } from '@application/helpers/api-erros'
import { ContactPage, ContactPageProps } from '@domain/contact-page/contact-page.entity'
import { ContactPageRepositoryInterface } from '@domain/contact-page/contact-page.repository'

type CreateContactPageInput = ContactPageProps & { id?: string }

export class CreateContactPageUseCase {
  constructor (private readonly repository: ContactPageRepositoryInterface) {}

  async execute (input: CreateContactPageInput): Promise<void> {
    try {
      const contactPage = ContactPage.create(input)
      await this.repository.create(contactPage)
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes('user_id')
      ) {
        throw new ConflictError('This contact page already exists for this user')
      }
      throw error
    }
  }
}
