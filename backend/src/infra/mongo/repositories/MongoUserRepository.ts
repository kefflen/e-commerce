import { User } from '../../../domain/entities/User'
import { IUserRepository } from '../../../domain/repositories'
import { UserModel } from '../models/UserModel'

export class MongoUserRepository implements IUserRepository {
  async getUserByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email: email })
    if (!user) return null

    return new User(user.toJSON())
  }

  async updateUser(user: User): Promise<User | null> {
    const updatedUser = await UserModel.findOneAndUpdate(user.toJSON())
    if (!updatedUser) return null

    return new User(updatedUser.toJSON())
  }

  async createUser(user: User): Promise<User | null> {
    const createdUser = new UserModel(user.toJSON())
    const savedUser = await createdUser.save()

    return new User(savedUser.toJSON())
  }

  async getAllUsers(): Promise<User[]> {
    const usersData = await UserModel.find()

    return usersData.map(user => new User(user.toJSON()))
  }

  async deleteUser(id: string): Promise<void> {
    await UserModel.deleteOne({ _id: id })
  }

  async getUserById(id: string): Promise<User | null> {
    const usersData = await UserModel.findById(id)
    if (!usersData) return null

    return new User(usersData.toJSON())
  }
}
