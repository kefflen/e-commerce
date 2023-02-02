import { normalizedUserDTO } from '../../entities/User'
import { UserService } from '../_contracts'

export class ListUserService extends UserService {
  async execute(page: number): Promise<normalizedUserDTO[]> {
    const users = await this.userRepository.list({
      pagination: {
        take: 15,
        page,
      },
    })

    return users.map((user) => user.toNormalizedJSON())
  }
}
