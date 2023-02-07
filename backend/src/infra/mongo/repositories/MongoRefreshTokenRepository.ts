import { RefreshToken } from '../../../domain/entities/RefreshToken'
import { IRefreshTokenRepository } from '../../../domain/repositories/IRefreshTokenRepository'
import { repositoryOptions } from '../../../domain/repositories/_contracts/IRepository'
import { RefreshTokenModel } from '../models/RefreshTokenModel'

export class MongoRefreshTokenRepository implements IRefreshTokenRepository {
  async createOrUpdateByUserId(refreshToken: RefreshToken): Promise<RefreshToken> {
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

  async list(options: repositoryOptions<RefreshToken>): Promise<RefreshToken[]> {
    let query = RefreshTokenModel.find()

    if (options.pagination) {
      const { take, page } = options.pagination
      query = query.limit(take).skip((page - 1) * take)
    }

    if (options.where) {
      query.where(options.where)
    }

    if (options.sortings) {
      query.sort(options.sortings)
    }

    const refreshTokensData = await query

    return refreshTokensData.map(
      (refreshtokenData) => new RefreshToken(refreshtokenData.toJSON()),
    )
  }

  async create(refreshtoken: RefreshToken): Promise<RefreshToken> {
    const refreshtokenData = new RefreshTokenModel(refreshtoken.toJSON())
    const newRefreshTokenData = await refreshtokenData.save()

    return new RefreshToken(newRefreshTokenData.toJSON())
  }

  async update(refreshtoken: RefreshToken): Promise<RefreshToken | null> {
    const updatedRefreshTokenData = await RefreshTokenModel.findOneAndUpdate(
      refreshtoken.toJSON(),
    )

    if (!updatedRefreshTokenData) return null

    return new RefreshToken(updatedRefreshTokenData.toJSON())
  }

  async delete(id: string): Promise<void> {
    await RefreshTokenModel.deleteOne({ _id: id })
  }

  async getById(id: string): Promise<RefreshToken | null> {
    const refreshtokenData = await RefreshTokenModel.findOne({ _id: id })

    if (!refreshtokenData) return null

    return new RefreshToken(refreshtokenData.toJSON())
  }
}
