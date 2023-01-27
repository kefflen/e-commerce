import { Router } from 'express'

const userRoutes = Router()

userRoutes.post('/login', (req, res) => {
  res.send('/register')
})

export default userRoutes