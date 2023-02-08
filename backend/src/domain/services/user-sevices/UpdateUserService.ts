import { normalizedUserDTO, userDTO } from '../../entities/User'
import { AppError } from '../../errors/AppError'
import { UserService } from '../_contracts'

export class UpdateUserService extends UserService {
  async execute(
    updateDTO: Omit<
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
    const user = await this.userRepository.getById(updateDTO._id)

    if (!user) {
      throw AppError.notFound('User not found')
    }

    user.update({
      firstName: updateDTO.firstName,
      lastName: updateDTO.lastName,
      mobile: updateDTO.mobile,
    })

    const updatedUser = await this.userRepository.update(user)

    if (!updatedUser) {
      throw AppError.notFound('User not found')
    }

    return updatedUser.toNormalizedJSON()
  }
}
