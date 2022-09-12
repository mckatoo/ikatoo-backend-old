import { ConflictError } from '@application/helpers/api-erros'
import { Skill, SkillProps } from '@domain/skill/skill.entity'
import { SkillRepositoryInterface } from '@domain/skill/skill.repository'

type CreateSkillInput = SkillProps & { id?: string }

type CreateSkillOutput = SkillProps & { id: string }

export class CreateSkillUseCase {
  constructor (private readonly repository: SkillRepositoryInterface) {}

  async execute (input: CreateSkillInput): Promise<CreateSkillOutput> {
    const userExists = await this.repository.getByUserId(input.user_id)
    const skillExists = userExists.find(skill => skill.title === input.title)
    if (skillExists != null) throw new ConflictError('Skill already exists for this user')

    const skill = Skill.create(input)
    await this.repository.create(skill)

    return skill.toJson()
  }
}
