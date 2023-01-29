import bcryptjs from 'bcryptjs'
import { loggedInUserDTO } from '../../entities/User';
import { AppError } from '../../errors/AppError';
import { UserService } from "../_contracts/UserService";

export class LoginService extends UserService {

  async execute(email: string, password: string): Promise<loggedInUserDTO> {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) throw AppError.notFound("User not found")

    const isValidPassword = bcryptjs.compare(password, user.password)
    if (!isValidPassword) throw AppError.badRequest("Invalid password or email")

    const token = await this.sessionManager.createSession({
      id: user.id,
    })

    return {
      token,
      user: user.toNormalizedJSON(),
    }
  }
}