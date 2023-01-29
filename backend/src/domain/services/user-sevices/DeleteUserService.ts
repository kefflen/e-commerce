import { UserService } from '../_contracts'

export class DeleteUserService extends UserService {
  async execute(userId: string): Promise<void> {
    await this.userRepository.deleteUser(userId)
  }

}