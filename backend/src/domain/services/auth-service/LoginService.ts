import { loggedInUserDTO } from '../../entities/User'
import { AppError } from '../../errors/AppError'
import { AuthService } from '../_contracts'

export class LoginService extends AuthService {
  async execute(email: string, password: string): Promise<loggedInUserDTO> {
    const user = await this.userRepository.getUserByEmail(email)
    if (!user) throw AppError.notFound('User not found')

    const isValidPassword = this.passwordHandler.validate(
      password,
      user.password,
    )
    if (!isValidPassword) throw AppError.badRequest('Invalid password or email')

    const token = await this.sessionManager.createSession({
      id: user.id,
    })

    return {
      token,
      user: user.toNormalizedJSON(),
    }
  }
}
