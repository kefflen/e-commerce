import { Router } from 'express'
import {
  blockUserController,
  createUserController,
  deleteUserController,
  getUserByIdController,
  listUsersController,
  updatedUserController,
} from '../controllers/userController'
import { ROLES } from '../domain/entities/User'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'
import { ensureRole } from './middlewares/ensureRole'

const userRoutes = Router()

userRoutes.post('/', createUserController)
userRoutes.post('/:userId', ensureAuthenticated, updatedUserController)
userRoutes.get('/:userId', ensureAuthenticated, getUserByIdController)
userRoutes.delete('/:userId', ensureAuthenticated, deleteUserController)
userRoutes.get(
  '/',
  ensureAuthenticated,
  ensureRole(ROLES.ADMIN),
  listUsersController,
)
userRoutes.put(
  '/:userId',
  ensureAuthenticated,
  ensureRole(ROLES.ADMIN),
  blockUserController,
)

export default userRoutes
