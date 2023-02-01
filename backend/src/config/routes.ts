import { Router } from 'express'
import authRoutes from '../routes/authRoutes'
import productRoutes from '../routes/productRoutes'
import userRoutes from '../routes/userRoutes'

const routes = Router()
routes.use('/users', userRoutes)
routes.use('/auth', authRoutes)
routes.use('products', productRoutes)

export default routes
