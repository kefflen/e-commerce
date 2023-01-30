import { Request, Response } from 'express'
import { userServiceFactory } from '../factories'

const {
  createUserService,
  updateUserService,
  getUserByIdService,
  listUserService,
  deleteUserService,
} = userServiceFactory()

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
  const { firstName, mobile, lastName } = req.body
  const updatedUser = updateUserService.execute({
    _id: userId,
    firstName,
    mobile,
    lastName,
  })

  return res.status(200).json(updatedUser)
}

export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params
  const user = await getUserByIdService.execute(userId)

  return res.status(200).json(user)
}

export const listUsers = async (req: Request, res: Response) => {
  const users = await listUserService.execute()

  return res.status(200).json(users)
}

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params
  await deleteUserService.execute(userId)

  return res.sendStatus(204)
}
