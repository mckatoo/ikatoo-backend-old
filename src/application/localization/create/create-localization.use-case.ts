import { ConflictError } from '@application/helpers/api-erros'
import { LocalizationProps } from '@domain/localization/localization.entity'
import { LocalizationRepositoryInterface } from '@domain/localization/localization.repository'

type CreateLocalizationInput = LocalizationProps & { id?: string }

export class CreateLocalizationUseCase {
  constructor (private readonly repository: LocalizationRepositoryInterface) {}

  async execute (input: CreateLocalizationInput): Promise<void> {
    try {
      await this.repository.create(input)
    } catch (error) {
      if (error instanceof Error && error.message.includes('user_id')) {
        throw new ConflictError('Localization for this user already exists')
      }
    }
  }
}
