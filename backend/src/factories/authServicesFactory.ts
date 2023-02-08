import {
  VerifyAuthTokenService,
  LoginService,
  LogoutService,
  RefreshTokenService,
} from '../domain/services/auth-service'
import { authServicesDepedencies } from '../domain/services/_contracts'
import { MongoUserRepository } from '../infra/mongo/repositories/MongoUserRepository'
import { SessionManager, PasswordHandler } from '../infra/utils'
import { RedisCacheDataAccess } from '../infra/redis/RedisCacheDataAccess'
import { MongoRefreshTokenRepository } from '../infra/mongo/repositories/MongoRefreshTokenRepository'
import { User } from '../domain/entities/User'
import { UserModel } from '../infra/mongo/models/UserModel'
import { RefreshToken } from '../domain/entities/RefreshToken'
import { RefreshTokenModel } from '../infra/mongo/models/RefreshTokenModel'

type services = {
  verifyAuthTokenService: VerifyAuthTokenService
  loginService: LoginService
  logoutService: LogoutService
  refreshTokenService: RefreshTokenService
}

let instance: services | null = null

export function authServicesFactory(): services {
  if (instance === null) {
    const authServicesDepedencies: authServicesDepedencies = {
      userRepository: new MongoUserRepository(UserModel, User),
      refreshTokenRepository: new MongoRefreshTokenRepository(
        RefreshTokenModel,
        RefreshToken,
      ),
      sessionManager: new SessionManager(),
      passwordHandler: new PasswordHandler(),
      cacheDataAccess: new RedisCacheDataAccess(),
    }

    instance = {
      verifyAuthTokenService: new VerifyAuthTokenService(
        authServicesDepedencies,
      ),
      loginService: new LoginService(authServicesDepedencies),
      logoutService: new LogoutService(authServicesDepedencies),
      refreshTokenService: new RefreshTokenService(authServicesDepedencies),
    }
  }

  return Object.freeze(instance)
}
