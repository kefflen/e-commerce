import { UserService } from '../_contracts'

export class BlockUserService extends UserService {
  async execute(userId: string): Promise<void> {
    const user = await this.userRepository.getById(userId)

    if (!user) {
      throw new Error('User not found')
    }

    user.update({ isBlocked: true })
    await this.userRepository.update(user)
  }
}
