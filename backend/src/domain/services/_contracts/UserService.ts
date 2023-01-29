import { IPasswordHandler, ISessionManager } from '../../ports'
import { IUserRepository } from '../../repositories/IUserRepository'

type depedencies = {
  userRepository: IUserRepository
  sessionManager: ISessionManager
  passwordHandler: IPasswordHandler
}

export abstract class UserService {
  userRepository: IUserRepository
  sessionManager: ISessionManager
  passwordHandler: IPasswordHandler

  constructor(depedencies: depedencies) {
    this.userRepository = depedencies.userRepository
    this.sessionManager = depedencies.sessionManager
    this.passwordHandler = depedencies.passwordHandler
  }
  abstract execute(...any: unknown[]): Promise<unknown>
}
