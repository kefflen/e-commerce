import { Router } from 'express'
import authRoutes from '../routes/authRoutes'
import userRoutes from '../routes/userRoutes'

const routes = Router()
routes.use('/users', userRoutes)
routes.use('/auth', authRoutes)
export default routes
