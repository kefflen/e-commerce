import { IPasswordHandler, ISessionManager } from '../../ports'
import { IUserRepository } from '../../repositories'
import { userServicesDepedencies } from './UserService'

export type authServicesDepedencies = userServicesDepedencies

export abstract class AuthService {
  protected readonly userRepository: IUserRepository
  protected readonly sessionManager: ISessionManager
  protected readonly passwordHandler: IPasswordHandler

  constructor(depedencies: authServicesDepedencies) {
    this.userRepository = depedencies.userRepository
    this.sessionManager = depedencies.sessionManager
    this.passwordHandler = depedencies.passwordHandler
  }

  abstract execute(...args: unknown[]): Promise<unknown>
}
