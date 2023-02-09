import { User, userDTO } from '../../../domain/entities/User'
import { IUserRepository } from '../../../domain/repositories'
import { repositoryOptions } from '../../../domain/repositories/_contracts/IRepository'
import { UserModel } from '../models/UserModel'
import { MongoRepository } from './MongoRepository'

export class MongoUserRepository
  extends MongoRepository<typeof UserModel, User, userDTO>
  implements IUserRepository
{
  async getByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email: email })
    if (!user) return null

    return new User(user.toJSON())
  }
}
