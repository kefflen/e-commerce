import { RefreshToken } from '../entities/RefreshToken'
import { IRepository } from './_contracts/IRepository'

export interface IRefreshTokenRepository extends IRepository<RefreshToken> {
  getByUserId(userId: string): Promise<RefreshToken | null>
  createOrUpdateByUserId(refreshToken: RefreshToken): Promise<RefreshToken>
}
