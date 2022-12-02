import { SkillsPageRepositoryInterface, SkillsPageWithId } from '@domain/skills-page/skills-page.repository'

export class GetSkillsPageUseCase {
  constructor (private readonly skillsPageRepository: SkillsPageRepositoryInterface) {}

  async getByUserId (userId: string): Promise<SkillsPageWithId> {
    const skillsPage = await this.skillsPageRepository.getByUserId(userId)

    return skillsPage
  }
}
