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
    await this.model.deleteOne({ userId: refreshToken.userId })
    const data = await this.model.create(refreshToken.toJSON())

    return new this.cls(data.toObject())
  }

  async getByUserId(userId: string): Promise<RefreshToken | null> {
    const refreshTokenData = await RefreshTokenModel.findOne({ userId })

    if (!refreshTokenData) return null

    return new RefreshToken(refreshTokenData.toJSON())
  }
}
