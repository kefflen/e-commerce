import {
  IPasswordHandler,
  ISessionManager,
  ICacheDataAccess,
} from '../../ports'
import { IUserRepository } from '../../repositories'
import { userServicesDepedencies } from './UserService'

export type authServicesDepedencies = userServicesDepedencies & {
  cacheDataAccess: ICacheDataAccess
}

export abstract class AuthService {
  protected readonly userRepository: IUserRepository
  protected readonly sessionManager: ISessionManager
  protected readonly passwordHandler: IPasswordHandler
  protected readonly cacheDataAccess: ICacheDataAccess

  constructor(depedencies: authServicesDepedencies) {
    this.userRepository = depedencies.userRepository
    this.sessionManager = depedencies.sessionManager
    this.passwordHandler = depedencies.passwordHandler
    this.cacheDataAccess = depedencies.cacheDataAccess
  }

  abstract execute(...args: unknown[]): Promise<unknown>
}
