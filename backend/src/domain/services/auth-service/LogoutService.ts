import { AuthService } from '../_contracts'

export class LogoutService extends AuthService {
  async execute(
    jwtToken: string,
    userId: string,
    expireUnix: number,
  ): Promise<void> {
    const secondsToExpire = unixToSecondsToExpire(expireUnix)

    const userToken = await this.refreshTokenRepository.getByUserId(userId)

    if (userToken) {
      await this.refreshTokenRepository.delete(userToken.id)
      const decodedRefreshToken = this.sessionManager.verifySession(
        userToken.refreshToken,
      )

      let secondsToExpireRefreshToken: number | null = null

      if (decodedRefreshToken) {
        secondsToExpireRefreshToken = unixToSecondsToExpire(
          decodedRefreshToken.exp,
        )
      }

      const oneDayInSeconds = 24 * 60 * 60
      await this.cacheDataAccess.set(
        `refresh-token-${userToken.refreshToken}`,
        new Date().toDateString(),
        secondsToExpireRefreshToken || oneDayInSeconds,
      )
    }

    await this.cacheDataAccess.set(
      `jwtToken-${jwtToken}`,
      new Date().toDateString(),
      secondsToExpire,
    )

    function unixToSecondsToExpire(expireUnix: number) {
      const expirationDate = new Date(expireUnix * 1000)
      const now = new Date()
      const secondsToExpire = Math.floor(
        expirationDate.getTime() / 1000 - now.getTime() / 1000,
      )

      return secondsToExpire
    }
  }
}
