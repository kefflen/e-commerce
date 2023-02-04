import { Router } from 'express'
import authRoutes from '../routes/authRoutes'
import categoryRoutes from '../routes/categoryRoutes'
import productRoutes from '../routes/productRoutes'
import userRoutes from '../routes/userRoutes'

const routes = Router()
routes.use('/users', userRoutes)
routes.use('/auth', authRoutes)
routes.use('/products', productRoutes)
routes.use('/categories', categoryRoutes)
export default routes
