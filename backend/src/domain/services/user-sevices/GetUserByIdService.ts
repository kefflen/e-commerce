import { normalizedUserDTO } from '../../entities/User'
import { AppError } from '../../errors/AppError'
import { UserService } from '../_contracts'

export class GetUserByIdService extends UserService {
  async execute(userId: string): Promise<normalizedUserDTO> {
    const user = await this.userRepository.getUserById(userId)
    if (!user) throw AppError.notFound('User not found')

    return user.toNormalizedJSON()
  }
}
