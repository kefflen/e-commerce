import { normalizedUserDTO } from '../../entities/User'
import { UserService } from '../_contracts'

export class ListUserService extends UserService {
  async execute(): Promise<normalizedUserDTO[]> {
    const users = await this.userRepository.getAllUsers()

    return users.map(user => user.toNormalizedJSON())
  }
}