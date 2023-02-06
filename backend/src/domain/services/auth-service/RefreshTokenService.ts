import { AppError } from '../../errors/AppError'
import { AuthService } from '../_contracts'

export class RefreshTokenService extends AuthService {
  async execute(
    refreshToken: string,
  ): Promise<{ token: string; refreshToken: string }> {
    const decodedPayload = this.sessionManager.verifySession(refreshToken)
    const tokenUser = decodedPayload?.userId

    if (!tokenUser) throw AppError.unauthorized('Invalid refresh token')

    const hasLogoutRefreshToken = await this.cacheDataAccess.get(`refresh-token-${refreshToken}`)
    if (hasLogoutRefreshToken) throw AppError.unauthorized('Invalid refresh token')

    const newTokens = await this.sessionManager.createSession({
      userId: decodedPayload?.userId,
    })

    await this.refreshTokenRepository.createOrUpdateByUserId(tokenUser, refreshToken)

    return newTokens
  }
}
