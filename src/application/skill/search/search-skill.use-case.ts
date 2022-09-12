import { SkillRepositoryInterface, SkillWithId } from '@domain/skill/skill.repository'

export class SearchSkillUseCase {
  constructor (
    private readonly repository: SkillRepositoryInterface
  ) {}

  async execute (title: string): Promise<SkillWithId[]> {
    const skills = await this.repository.searchByTitle(title)
    return skills
  }
}
