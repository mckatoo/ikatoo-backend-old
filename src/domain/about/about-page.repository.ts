import { AboutPageProps } from './about-page.entity'

export type AboutPageWithId = AboutPageProps & { id?: string }

export interface AboutPageRepositoryInterface {
  create: (aboutPage: AboutPageWithId) => Promise<void>
  getByUserId: (userId: string) => Promise<AboutPageWithId>
  getByDomain: (domain: string) => Promise<AboutPageWithId>
  getAll: () => Promise<AboutPageWithId[]>
}
