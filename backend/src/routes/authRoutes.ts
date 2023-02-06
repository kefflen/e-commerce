import { Router } from 'express'
import {
  loginController,
  logoutController,
  refreshTokenController,
} from '../controllers/authController'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'

const authRoutes = Router()

authRoutes.post('/login', loginController)
authRoutes.get('/logout', ensureAuthenticated, logoutController)
authRoutes.post('/refresh-token', refreshTokenController)

export default authRoutes
