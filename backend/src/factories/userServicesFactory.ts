import {
  CreateUserService,
  LoginService,
  UpdateUserService,
  DeleteUserService,
  GetUserByIdService,
  ListUserService
} from '../domain/services/user-sevices'
import { userServicesDepedencies } from '../domain/services/_contracts'
import { MongoUserRepository } from '../infra/mongo/repositories/MongoUserRepository'
import { SessionManager, PasswordHandler } from '../infra/utils'

type services = {
  createUserService: CreateUserService
  loginService: LoginService
  updateUserService: UpdateUserService
  deleteUserService: DeleteUserService
  getUserByIdService: GetUserByIdService
  listUserService: ListUserService
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
      deleteUserService: new DeleteUserService(userServicesDepedencies),
      getUserByIdService: new GetUserByIdService(userServicesDepedencies),
      listUserService: new ListUserService(userServicesDepedencies),
    }
  }

  return Object.freeze(instance)
}
