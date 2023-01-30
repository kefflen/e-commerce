import { Router } from 'express'
import {
  createUser,
  deleteUser,
  getUserById,
  listUsers,
  updatedUser,
} from '../controllers/userController'

const userRoutes = Router()

userRoutes.post('/', createUser)
userRoutes.post('/:userId', updatedUser)
userRoutes.get('/:userId', getUserById)
userRoutes.delete('/:userId', deleteUser)
userRoutes.get('/', listUsers)

export default userRoutes
