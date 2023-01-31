import { normalizedUserDTO, userDTO } from '../../entities/User'
import { AppError } from '../../errors/AppError'
import { UserService } from '../_contracts'

export class UpdateUserService extends UserService {
  async execute(
    user: Omit<
      userDTO,
      | 'password'
      | 'wishlist'
      | 'cart'
      | 'createdAt'
      | 'updatedAt'
      | 'isBlocked'
      | 'role'
      | 'email'
    >,
  ): Promise<normalizedUserDTO> {
    const persistedUser = await this.userRepository.getById(user._id)

    if (!persistedUser) {
      throw AppError.notFound('User not found')
    }

    const updatedUser = await this.userRepository.update(
      persistedUser.update({
        firstName: user.firstName,
        lastName: user.lastName,
        mobile: user.mobile,
        // password: user.password
        // _id: user._id
      }),
    )

    if (!updatedUser) {
      throw AppError.notFound('User not found')
    }

    return updatedUser.toNormalizedJSON()
  }
}
