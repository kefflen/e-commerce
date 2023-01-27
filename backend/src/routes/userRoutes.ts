import { Router } from 'express'
import { createUser, updatedUser } from '../controllers/userController'

const userRoutes = Router()

userRoutes.post('/login', createUser)
userRoutes.post('/', updatedUser)

export default userRoutes
