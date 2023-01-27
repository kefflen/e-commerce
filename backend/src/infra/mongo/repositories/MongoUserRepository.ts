import { User } from '../../../domain/entities/User'
import { IUserRepository } from '../../../domain/repositories'
import { UserModel } from '../models/UserModel'

export class MongoUserRepository implements IUserRepository {
  async updateUser(user: User): Promise<User | null> {
    throw new Error('Method not implemented.')
  }

  async createUser(user: User): Promise<User | null> {
    const createdUser = new UserModel(user.toJSON())
    const savedUser = await createdUser.save()

    return new User(savedUser.toJSON())
  }
  
  async getAllUsers(): Promise<User[]> {
    throw new Error('Method not implemented.')
  }

  async deleteUser(id: string): Promise<null> {
    throw new Error('Method not implemented.')
  }

  async getUserById(id: string): Promise<User | null> {
    const usersData = await UserModel.findById(id)
    if (!usersData) return null

    return new User(usersData.toJSON())
  }
}
