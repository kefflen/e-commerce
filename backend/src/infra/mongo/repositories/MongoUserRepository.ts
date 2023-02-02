import { User } from '../../../domain/entities/User'
import { IUserRepository } from '../../../domain/repositories'
import { repositoryOptions } from '../../../domain/repositories/_contracts/IRepository'
import { UserModel } from '../models/UserModel'

export class MongoUserRepository implements IUserRepository {
  async getByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email: email })
    if (!user) return null

    return new User(user.toJSON())
  }

  async update(user: User): Promise<User | null> {
    const updatedUser = await UserModel.findOneAndUpdate(user.toJSON())
    if (!updatedUser) return null

    return new User(updatedUser.toJSON())
  }

  async create(user: User): Promise<User> {
    const createdUser = new UserModel(user.toJSON())
    const savedUser = await createdUser.save()

    return new User(savedUser.toJSON())
  }

  async list(options: repositoryOptions<User>): Promise<User[]> {
    let query = UserModel.find()

    if (options.pagination) {
      const { take, page } = options.pagination
      query = query.limit(take).skip((page - 1) * take)
    }

    if (options.where) {
      query.where(options.where)
    }

    const productsData = await query

    return productsData.map((user) => new User(user.toJSON()))
  }

  async delete(id: string): Promise<void> {
    await UserModel.deleteOne({ _id: id })
  }

  async getById(id: string): Promise<User | null> {
    const usersData = await UserModel.findById(id)
    if (!usersData) return null

    return new User(usersData.toJSON())
  }
}
