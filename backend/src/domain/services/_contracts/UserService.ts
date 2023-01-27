import { IUserRepository } from '../../repositories/IUserRepository'

type depedencies = {
  userRepository: IUserRepository
}

export abstract class UserService {
  userRepository: IUserRepository
  constructor(depedencies: depedencies) {
    this.userRepository = depedencies.userRepository
  }
abstract execute(...any: unknown[]): Promise<unknown>
}
