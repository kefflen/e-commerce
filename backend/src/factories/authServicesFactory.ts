import { VerifyAuthTokenService } from '../domain/services/auth-service/VerifyAuthTokenService'
import { authServicesDepedencies } from '../domain/services/_contracts'
import { MongoUserRepository } from '../infra/mongo/repositories/MongoUserRepository'
import { SessionManager, PasswordHandler } from '../infra/utils'

type services = {
  verifyAuthTokenService: VerifyAuthTokenService
}

let instance: services | null = null

export function userServicesFactory(): services {
  if (instance === null) {
    const userServicesDepedencies: authServicesDepedencies = {
      userRepository: new MongoUserRepository(),
      sessionManager: new SessionManager(),
      passwordHandler: new PasswordHandler(),
    }

    instance = {
      verifyAuthTokenService: new VerifyAuthTokenService(userServicesDepedencies),
    }
  }

  return Object.freeze(instance)
}
