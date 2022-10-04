import { ContactPageProps } from './contact-page.entity'

export interface ContactPageRepositoryInterface {
  create: (skill: ContactPageProps) => Promise<void>
  getByUserId: (userId: string) => Promise<ContactPageProps>
  getByDomain: (domain: string) => Promise<ContactPageProps>
}
