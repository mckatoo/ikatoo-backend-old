import { SkillProps } from './skill.entity'

export type SkillWithId = SkillProps & { id?: string }

export interface SkillRepositoryInterface {
  create: (skill: SkillWithId) => Promise<void>
  getByUserId: (userId: string) => Promise<SkillWithId[]>
  getAll: () => Promise<SkillWithId[]>
  searchByTitle: (partialTitle: string) => Promise<SkillWithId[]>
}
