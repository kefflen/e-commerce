import crypto from 'node:crypto'
import { createUserDTO, normalizedUserDTO, User } from '../../entities/User'
import { AppError } from '../../errors/AppError'
import { UserService } from '../_contracts'

export class CreateUserService extends UserService {
  async execute({
    password,
    confirmPassword,
    ...rest
  }: createUserDTO): Promise<normalizedUserDTO> {
    if (password !== confirmPassword) {
      throw AppError.badRequest('Passwords do not match')
    }

    const existUserWithEmail = !!(await this.userRepository.getUserByEmail(
      rest.email,
    ))
    if (existUserWithEmail) throw AppError.conflict('Email already exists')

    const id = crypto.randomUUID()
    const hashedPassword = await this.passwordHandler.encrypt(password)
    const user = new User({
      _id: id,
      password: hashedPassword,
      ...rest,
    })

    await this.userRepository.createUser(user)

    return user.toNormalizedJSON()
  }
}
