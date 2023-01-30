import {
  CreateUserService,
  LoginService,
  UpdateUserService,
} from '../domain/services/user-sevices'
import { userServicesDepedencies } from '../domain/services/_contracts'
import { MongoUserRepository } from '../infra/mongo/repositories/MongoUserRepository'
import { SessionManager, PasswordHandler } from '../infra/utils'

type services = {
  createUserService: CreateUserService
  loginService: LoginService
  updateUserService: UpdateUserService
}

let instance: services | null = null

export function userServiceFactory(): services {
  if (instance === null) {
    const userServicesDepedencies: userServicesDepedencies = {
      userRepository: new MongoUserRepository(),
      sessionManager: new SessionManager(),
      passwordHandler: new PasswordHandler(),
    }

    instance = {
      createUserService: new CreateUserService(userServicesDepedencies),
      loginService: new LoginService(userServicesDepedencies),
      updateUserService: new UpdateUserService(userServicesDepedencies),
    }
  }

  return Object.freeze(instance)
}
