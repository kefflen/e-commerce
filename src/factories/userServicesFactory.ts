import {
  CreateUserService,
  UpdateUserService,
  DeleteUserService,
  GetUserByIdService,
  ListUserService,
  BlockUserService,
} from '../domain/services/user-sevices'
import { userServicesDepedencies } from '../domain/services/_contracts'
import { User } from '../domain/entities/User'
import { UserModel } from '../infra/mongo/models/UserModel'
import { MongoRefreshTokenRepository } from '../infra/mongo/repositories/MongoRefreshTokenRepository'
import { MongoUserRepository } from '../infra/mongo/repositories/MongoUserRepository'
import { SessionManager, PasswordHandler } from '../infra/utils'
import { RefreshTokenModel } from '../infra/mongo/models/RefreshTokenModel'
import { RefreshToken } from '../domain/entities/RefreshToken'

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
      userRepository: new MongoUserRepository(UserModel, User),
      refreshTokenRepository: new MongoRefreshTokenRepository(
        RefreshTokenModel,
        RefreshToken,
      ),
      sessionManager: new SessionManager(),
      passwordHandler: new PasswordHandler(),
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
