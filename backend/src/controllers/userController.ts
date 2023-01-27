import { Request, Response } from 'express'
import { CreateUserService } from '../domain/services/user-sevices'
import { MongoUserRepository } from '../infra/mongo/repositories/MongoUserRepository'

const userDepedencies = {
  userRepository: new MongoUserRepository(),
}

const createUserService = new CreateUserService(userDepedencies)

export const createUser = async (req: Request, res: Response) => {
  const { email, password, confirmPassword, firstName, mobile, lastName } = req.body

  if (!email || !password || !firstName || !lastName || !mobile) {
    return res.status(400).json({})
  }

  const createdUser = await createUserService.execute({ email, password, confirmPassword, firstName, mobile, lastName })

  return res.status(201).json(createdUser)
}