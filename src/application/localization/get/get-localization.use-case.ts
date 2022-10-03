import { LocalizationRepositoryInterface, LocalizationWithId } from '@domain/localization/localization.repository'

export class GetLocalizationUseCase {
  constructor (private readonly repository: LocalizationRepositoryInterface) {}

  async byUserId (userId: string): Promise<LocalizationWithId> {
    const localization = await this.repository.getByUserId(userId)

    return localization
  }
}
