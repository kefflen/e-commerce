import { User, userDTO } from '../../entities/User'
import { AppError } from '../../errors/AppError'
import { UserService } from '../_contracts'

export class UpdateUserService extends UserService {
  async execute(user: Omit<userDTO, 'password'>): Promise<User> {
    const persistedUser = await this.userRepository.getUserById(user._id)

    if (!persistedUser) {
      throw AppError.notFound('User not found')
    }

    const updatedUser = await this.userRepository.updateUser(
      persistedUser.update({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobile: user.mobile,
        // password: user.password
        // _id: user._id
      }),
    )

    if (!updatedUser) {
      throw AppError.notFound('User not found')
    }

    return updatedUser
  }
}
