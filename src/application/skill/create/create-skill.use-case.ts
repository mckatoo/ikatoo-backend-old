import { ConflictError } from '@application/helpers/api-erros'
import { Skill, SkillProps } from '@domain/skill/skill.entity'
import { SkillRepositoryInterface, SkillWithId } from '@domain/skill/skill.repository'

type CreateSkillInput = SkillProps & { id?: string }

export class CreateSkillUseCase {
  constructor (private readonly repository: SkillRepositoryInterface) {}

  async execute (input: CreateSkillInput): Promise<Required<SkillWithId>> {
    const userExists = await this.repository.getByUserId(input.user_id)
    const skillExists = userExists.find(skill => skill.title === input.title)
    if (skillExists != null) throw new ConflictError('This skill already exists for this user')

    const skill = Skill.create(input, input.id)
    await this.repository.create(skill)

    return skill.toJson()
  }
}
