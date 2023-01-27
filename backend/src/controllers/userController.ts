import { Request, Response } from 'express'
import { User } from '../infra/mongo/models/User'
import bcryptjs from 'bcryptjs'

export const createUser = async (req: Request, res: Response) => {
  const {
    email,
    password,
    firstName,
    mobile,
    lastName
  } = req.body

  if (!email ||!password ||!firstName ||!lastName ||!mobile) {
    return res.status(400).json({})
  }

  const hashedPassword = await bcryptjs.hash(password, 10)

  const user = await User.create({
    email,
    password: hashedPassword,
    firstName,
    lastName,
    mobile
  })
  return res.status(201).json(user)
}