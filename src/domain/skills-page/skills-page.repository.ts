import { SkillsPageProps } from './skills-page.entity'

export type SkillsPageWithId = SkillsPageProps & { id?: string }

export interface SkillsPageRepositoryInterface {
  create: (skill: SkillsPageWithId) => Promise<void>
  getByUserId: (userId: string) => Promise<SkillsPageWithId>
}
