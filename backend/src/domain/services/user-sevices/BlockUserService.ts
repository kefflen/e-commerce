import { UserService } from '../_contracts'

export class BlockUserService extends UserService {
  async execute(userId: string): Promise<void> {
    const user = await this.userRepository.getUserById(userId)

    if (!user) {
      throw new Error('User not found')
    }

    const blockedUser = user.update({ isBlocked: true })
    await this.userRepository.updateUser(blockedUser)
  }
}
