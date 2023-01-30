import { IPasswordHandler, ISessionManager } from '../../ports'
import { IUserRepository } from '../../repositories/IUserRepository'

export type userServicesDepedencies = {
  userRepository: IUserRepository
  sessionManager: ISessionManager
  passwordHandler: IPasswordHandler
}

export abstract class UserService {
  userRepository: IUserRepository
  sessionManager: ISessionManager
  passwordHandler: IPasswordHandler

  constructor(depedencies: userServicesDepedencies) {
    this.userRepository = depedencies.userRepository
    this.sessionManager = depedencies.sessionManager
    this.passwordHandler = depedencies.passwordHandler
  }
  abstract execute(...any: unknown[]): Promise<unknown>
}
