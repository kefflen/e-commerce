import { ISessionManager } from '../../ports/ISessionManager'
import { IUserRepository } from '../../repositories/IUserRepository'

type depedencies = {
  userRepository: IUserRepository
  sessionManager: ISessionManager
}

export abstract class UserService {
  userRepository: IUserRepository
  sessionManager: ISessionManager

  constructor(depedencies: depedencies) {
    this.userRepository = depedencies.userRepository
    this.sessionManager = depedencies.sessionManager
  }
abstract execute(...any: unknown[]): Promise<unknown>
}
