import {
  VerifyAuthTokenService,
  LoginService,
} from '../domain/services/auth-service'
import { authServicesDepedencies } from '../domain/services/_contracts'
import { MongoUserRepository } from '../infra/mongo/repositories/MongoUserRepository'
import { SessionManager, PasswordHandler } from '../infra/utils'

type services = {
  verifyAuthTokenService: VerifyAuthTokenService
  loginService: LoginService
}

let instance: services | null = null

export function authServicesFactory(): services {
  if (instance === null) {
    const userServicesDepedencies: authServicesDepedencies = {
      userRepository: new MongoUserRepository(),
      sessionManager: new SessionManager(),
      passwordHandler: new PasswordHandler(),
    }

    instance = {
      verifyAuthTokenService: new VerifyAuthTokenService(
        userServicesDepedencies,
      ),
      loginService: new LoginService(userServicesDepedencies),
    }
  }

  return Object.freeze(instance)
}
