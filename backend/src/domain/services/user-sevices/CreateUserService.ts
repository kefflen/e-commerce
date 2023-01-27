import bcryptjs from 'bcryptjs'
import crypto from 'node:crypto'
import { createUserDTO, User } from '../../entities/User'
import { AppError } from '../../errors/AppError'
import { UserService } from '../_contracts/UserService'

export class CreateUserService extends UserService {
  async execute({password, confirmPassword,...rest}: createUserDTO): Promise<User> {
    if (password!== confirmPassword) {
      throw AppError.badRequest('Passwords do not match')
    }

    const id = crypto.randomUUID()
    const hashedPassword = await bcryptjs.hash(password, 10)
    const user = new User({
      _id: id,
      password: hashedPassword,
      ...rest,
    })
    console.log(user.toJSON())
    await this.userRepository.createUser(user)

    return user
  }
}
