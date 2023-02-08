import {
  RefreshToken,
  refreshtokenDTO,
} from '../../../domain/entities/RefreshToken'
import { IRefreshTokenRepository } from '../../../domain/repositories/IRefreshTokenRepository'
import { RefreshTokenModel } from '../models/RefreshTokenModel'
import { MongoRepository } from './MongoRepository'

export class MongoRefreshTokenRepository
  extends MongoRepository<
    typeof RefreshTokenModel,
    RefreshToken,
    refreshtokenDTO
  >
  implements IRefreshTokenRepository
{
  async createOrUpdateByUserId(
    refreshToken: RefreshToken,
  ): Promise<RefreshToken> {
    const { userId } = refreshToken
    const userRefreshToken = await RefreshTokenModel.findOne({ userId })

    if (userRefreshToken) {
      const result = await userRefreshToken.update({ refreshToken })

      return new RefreshToken(result.toJSON())
    } else {
      const result = await RefreshTokenModel.create({ userId, refreshToken })

      return new RefreshToken(result.toJSON())
    }
  }

  async getByUserId(userId: string): Promise<RefreshToken | null> {
    const refreshTokenData = await RefreshTokenModel.findOne({ userId })

    if (!refreshTokenData) return null

    return new RefreshToken(refreshTokenData.toJSON())
  }
}
