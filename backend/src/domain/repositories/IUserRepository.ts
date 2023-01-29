import { User } from '../entities/User'

export interface IUserRepository {
  getUserById(id: string): Promise<User | null>
  updateUser(user: User): Promise<User | null>
  createUser(user: User): Promise<User | null>
  getAllUsers(): Promise<Array<User>>
  deleteUser(id: string): Promise<void>
  getUserByEmail(email: string): Promise<User | null>
}
