import { LocalizationProps } from './localization.entity'

export type LocalizationWithId = LocalizationProps & { id?: string }

export interface LocalizationRepositoryInterface {
  create: (project: LocalizationWithId) => Promise<void>
  getById: (id: string) => Promise<LocalizationWithId | undefined>
  getByUserId: (userId: string) => Promise<LocalizationWithId | undefined>
  getAll: () => Promise<LocalizationWithId[]>
}
