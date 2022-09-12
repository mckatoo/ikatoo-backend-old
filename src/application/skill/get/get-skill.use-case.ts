import { SkillRepositoryInterface, SkillWithId } from '@domain/skill/skill.repository'

export class GetSkillUseCase {
  constructor (private readonly repository: SkillRepositoryInterface) {}

  async byUserId (userId: string): Promise<SkillWithId[]> {
    const skills = await this.repository.getByUserId(userId)

    return skills
  }
}
