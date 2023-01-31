import { Router } from 'express'
import {
  loginController,
  logoutController,
} from '../controllers/authController'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'

const authRoutes = Router()

authRoutes.post('/login', loginController)
authRoutes.get('/logout', ensureAuthenticated, logoutController)

export default authRoutes
