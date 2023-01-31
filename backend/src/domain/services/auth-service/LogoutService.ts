import { AuthService } from '../_contracts'

export class LogoutService extends AuthService {
  async execute(jwtToken: string, expireUnix: number): Promise<void> {
    const expirationDate = new Date(expireUnix * 1000)
    const now = new Date()
    const secondsToExpire = Math.floor(
      expirationDate.getTime() / 1000 - now.getTime() / 1000,
    )

    await this.cacheDataAccess.set(
      `jwtToken-${jwtToken}`,
      now.toDateString(),
      secondsToExpire,
    )
  }
}
