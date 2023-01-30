import { Router } from 'express'
import {
  blockUser,
  createUser,
  deleteUser,
  getUserById,
  listUsers,
  updatedUser,
} from '../controllers/userController'
import { ROLES } from '../domain/entities/User'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'
import { ensureRole } from './middlewares/ensureRole'

const userRoutes = Router()

userRoutes.post('/', createUser)
userRoutes.post('/:userId', ensureAuthenticated, updatedUser)
userRoutes.get('/:userId', ensureAuthenticated, getUserById)
userRoutes.delete('/:userId', ensureAuthenticated, deleteUser)
userRoutes.get('/', ensureAuthenticated, ensureRole(ROLES.ADMIN), listUsers)
userRoutes.put(
  '/:userId',
  ensureAuthenticated,
  ensureRole(ROLES.ADMIN),
  blockUser,
)

export default userRoutes
