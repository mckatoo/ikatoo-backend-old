import { SocialLinksProps } from './social-links.entity'

export type SocialLinksWithId = SocialLinksProps & { id?: string }

export interface SocialLinksRepositoryInterface {
  create: (project: SocialLinksWithId) => Promise<void>
  getByUserId: (userId: string) => Promise<SocialLinksWithId[]>
  getAll: () => Promise<SocialLinksWithId[]>
  searchByName: (partialName: string) => Promise<SocialLinksWithId[]>
}
