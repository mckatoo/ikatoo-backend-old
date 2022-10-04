import { NotFoundError } from '@application/helpers/api-erros'
import { LocalizationRepositoryInterface, LocalizationWithId } from '@domain/localization/localization.repository'

export class GetLocalizationUseCase {
  constructor (private readonly repository: LocalizationRepositoryInterface) {}

  async byUserId (userId: string): Promise<LocalizationWithId | undefined> {
    const localization = await this.repository.getByUserId(userId)
    if (localization == null) {
      throw new NotFoundError('Localization not found')
    }

    return localization
  }
}
