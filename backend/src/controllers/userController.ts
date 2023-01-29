import { Request, Response } from 'express'
import { CreateUserService } from '../domain/services/user-sevices'
import { UpdateUserService } from '../domain/services/user-sevices/UpdateUserService'
import { MongoUserRepository } from '../infra/mongo/repositories/MongoUserRepository'
import { PasswordHandler, SessionManager } from '../infra/utils'

const userDepedencies = {
  userRepository: new MongoUserRepository(),
  sessionManager: new SessionManager(),
  passwordHandler: new PasswordHandler(),
}

const createUserService = new CreateUserService(userDepedencies)
const updatedUserService = new UpdateUserService(userDepedencies)

export const createUser = async (req: Request, res: Response) => {
  const { email, password, confirmPassword, firstName, mobile, lastName } =
    req.body

  if (!email || !password || !firstName || !lastName || !mobile) {
    return res.status(400).json({})
  }

  const createdUser = await createUserService.execute({
    email,
    password,
    confirmPassword,
    firstName,
    mobile,
    lastName,
  })

  return res.status(201).json(createdUser)
}

export const updatedUser = async (req: Request, res: Response) => {
  const { userId } = req.params
  const { email, firstName, mobile, lastName } = req.body
  const updatedUser = updatedUserService.execute({
    _id: userId,
    email,
    firstName,
    mobile,
    lastName,
  })

  return res.status(200).json(updatedUser)
}
