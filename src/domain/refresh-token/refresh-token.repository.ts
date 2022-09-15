import { RefreshTokenProps } from './refresh-token.entity'

export type RefreshTokenWithId = RefreshTokenProps & { id?: string }

export interface RefreshTokenRepositoryInterface {
  create: (refreshToken: RefreshTokenWithId) => Promise<void>
  getByUserId: (userId: string) => Promise<RefreshTokenWithId>
}
