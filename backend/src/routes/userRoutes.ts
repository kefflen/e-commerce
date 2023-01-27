import { Router } from 'express'
import { createUser } from '../controllers/userController'

const userRoutes = Router()

userRoutes.post('/login', createUser)

export default userRoutes
