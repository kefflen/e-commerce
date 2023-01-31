import { AppError } from '../../errors/AppError'
import { decodedPayload } from '../../ports'
import { AuthService } from '../_contracts/AuthService'

export class VerifyAuthTokenService extends AuthService {
  async execute(bearerToken: string): Promise<decodedPayload> {
    if (!bearerToken.startsWith('Bearer '))
      throw AppError.unauthorized('Invalid token')

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, token] = bearerToken.split(' ')
    const hasLogoutToken = await this.cacheDataAccess.get(`jwtToken-${token}`)
    if (hasLogoutToken) throw AppError.unauthorized('Invalid token')
    const payload = this.sessionManager.verifySession(token)

    if (!payload) throw AppError.unauthorized('Invalid token')

    return payload
  }
}
