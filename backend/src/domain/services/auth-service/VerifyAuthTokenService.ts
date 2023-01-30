import { AppError } from '../../errors/AppError'
import { userPayload } from '../../ports'
import { AuthService } from '../_contracts/AuthService'

export class VerifyAuthTokenService extends AuthService {
  async execute(token: string): Promise<userPayload> {
    if (!token.startsWith('Bearer '))
      throw AppError.unauthorized('Invalid token')
    const payload = this.sessionManager.verifySession(token)

    if (!payload) throw AppError.unauthorized('Invalid token')

    return payload
  }
}
