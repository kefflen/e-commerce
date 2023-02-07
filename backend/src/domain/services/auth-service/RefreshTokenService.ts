import { RefreshToken } from '../../entities/RefreshToken'
import { AppError } from '../../errors/AppError'
import { AuthService } from '../_contracts'

export class RefreshTokenService extends AuthService {
  async execute(
    refreshToken: string,
  ): Promise<{ token: string; refreshToken: string }> {
    const decodedPayload = this.sessionManager.verifySession(refreshToken)
    const userId = decodedPayload?.userId

    if (!userId) throw AppError.unauthorized('Invalid refresh token')

    const hasLogoutRefreshToken = await this.cacheDataAccess.get(`refresh-token-${refreshToken}`)
    if (hasLogoutRefreshToken) throw AppError.unauthorized('Invalid refresh token')

    const newTokens = await this.sessionManager.createSession({
      userId: decodedPayload?.userId,
    })

    const newRefreshToken = RefreshToken.create({ refreshToken: newTokens.refreshToken , userId })
    await this.refreshTokenRepository.createOrUpdateByUserId(newRefreshToken)

    return newTokens
  }
}
