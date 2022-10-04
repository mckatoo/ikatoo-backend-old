import { ConflictError } from '@application/helpers/api-erros'
import { SkillsPage, SkillsPageProps } from '@domain/skills-page/skills-page.entity'
import { SkillsPageRepositoryInterface, SkillsPageWithId } from '@domain/skills-page/skills-page.repository'

type CreateSkillsPageInput = SkillsPageProps & { id?: string }

export class CreateSkillsPageUseCase {
  constructor (private readonly repository: SkillsPageRepositoryInterface) {}

  async execute (input: CreateSkillsPageInput): Promise<Required<SkillsPageWithId>> {
    try {
      const skillsPage = SkillsPage.create(input)
      await this.repository.create(skillsPage)

      return skillsPage.toJson()
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === 'SQLITE_CONSTRAINT: UNIQUE constraint failed: skillsPages.user_id'
      ) {
        throw new ConflictError('This skills page already exists for this user')
      }
      throw error
    }
  }
}
