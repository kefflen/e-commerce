import {
  CreateUserService,
  UpdateUserService,
  DeleteUserService,
  GetUserByIdService,
  ListUserService,
  BlockUserService,
} from '../domain/services/user-sevices'
import { userServicesDepedencies } from '../domain/services/_contracts'
import { MongoRefreshTokenRepository } from '../infra/mongo/repositories/MongoRefreshTokenRepository'
import { MongoUserRepository } from '../infra/mongo/repositories/MongoUserRepository'
import { SessionManager, PasswordHandler } from '../infra/utils'

type services = {
  createUserService: CreateUserService
  updateUserService: UpdateUserService
  deleteUserService: DeleteUserService
  getUserByIdService: GetUserByIdService
  listUserService: ListUserService
  blockUserService: BlockUserService
}

let instance: services | null = null

export function userServiceFactory(): services {
  if (instance === null) {
    const userServicesDepedencies: userServicesDepedencies = {
      userRepository: new MongoUserRepository(),
      sessionManager: new SessionManager(),
      passwordHandler: new PasswordHandler(),
      refreshTokenRepository: new MongoRefreshTokenRepository(),
    }

    instance = {
      createUserService: new CreateUserService(userServicesDepedencies),
      updateUserService: new UpdateUserService(userServicesDepedencies),
      deleteUserService: new DeleteUserService(userServicesDepedencies),
      getUserByIdService: new GetUserByIdService(userServicesDepedencies),
      listUserService: new ListUserService(userServicesDepedencies),
      blockUserService: new BlockUserService(userServicesDepedencies),
    }
  }

  return Object.freeze(instance)
}
