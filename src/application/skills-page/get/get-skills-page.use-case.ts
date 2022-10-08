import { NotFoundError } from '@application/helpers/api-erros'
import { SkillsPageRepositoryInterface, SkillsPageWithId } from '@domain/skills-page/skills-page.repository'
import { UserRepository } from '@infra/db/user'

export class GetSkillsPageUseCase {
  constructor (private readonly skillsPageRepository: SkillsPageRepositoryInterface) {}

  async getByUserId (userId: string): Promise<SkillsPageWithId> {
    const skillsPage = await this.skillsPageRepository.getByUserId(userId)

    return skillsPage
  }

  async getByDomain (domain: string): Promise<SkillsPageWithId> {
    const userRepository = new UserRepository()
    const user = await userRepository.getByDomain(domain)
    if (user?.id == null) throw new NotFoundError('Domain not found')

    const skillsPage = await this.skillsPageRepository.getByUserId(user.id)

    return skillsPage
  }
}
