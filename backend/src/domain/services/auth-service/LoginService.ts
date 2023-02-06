import { RefreshToken } from '../../entities/RefreshToken'
import { loggedInUserDTO } from '../../entities/User'
import { AppError } from '../../errors/AppError'
import { AuthService } from '../_contracts'

export class LoginService extends AuthService {
  async execute(email: string, password: string): Promise<loggedInUserDTO> {
    const user = await this.userRepository.getByEmail(email)
    if (!user) throw AppError.notFound('User not found')

    const isValidPassword = this.passwordHandler.validate(
      password,
      user.password,
    )
    if (!isValidPassword) throw AppError.badRequest('Invalid password or email')

    const auth = await this.sessionManager.createSession({
      userId: user.id,
    })

    const refreshToken = RefreshToken.create({
      refreshToken: auth.refreshToken,
      userId: user.id,
    })
    await this.refreshTokenRepository.createOrUpdateByUserId(user.id, refreshToken)

    return {
      auth,
      user: user.toNormalizedJSON(),
    }
  }
}
