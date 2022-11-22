import { AboutPageProps } from './about-page.entity'

export type AboutPageWithId = AboutPageProps & { id?: string }
export type AboutPageUpdateType = Partial<AboutPageProps> & { id: string }

export interface AboutPageRepositoryInterface {
  create: (aboutPage: AboutPageWithId) => Promise<void>
  update: (aboutPage: AboutPageUpdateType) => Promise<void>
  getByUserId: (userId: string) => Promise<AboutPageWithId>
  getAll: () => Promise<AboutPageWithId[]>
}
