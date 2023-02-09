import { IPasswordHandler, ISessionManager } from '../../ports'
import { IRefreshTokenRepository } from '../../repositories/IRefreshTokenRepository'
import { IUserRepository } from '../../repositories/IUserRepository'

export type userServicesDepedencies = {
  userRepository: IUserRepository
  sessionManager: ISessionManager
  passwordHandler: IPasswordHandler
  refreshTokenRepository: IRefreshTokenRepository
}

export abstract class UserService {
  userRepository: IUserRepository
  sessionManager: ISessionManager
  passwordHandler: IPasswordHandler
  refreshTokenRepository: IRefreshTokenRepository

  constructor(depedencies: userServicesDepedencies) {
    this.userRepository = depedencies.userRepository
    this.sessionManager = depedencies.sessionManager
    this.passwordHandler = depedencies.passwordHandler
    this.refreshTokenRepository = depedencies.refreshTokenRepository
  }

  abstract execute(...any: unknown[]): Promise<unknown>
}
