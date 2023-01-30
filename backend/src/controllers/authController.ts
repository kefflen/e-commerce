import { Request, Response } from 'express'
import { AppError } from '../domain/errors/AppError'
import { authServicesFactory } from '../factories'

const { loginService } = authServicesFactory()

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) throw AppError.badRequest('Need a valid email or password')

  const user = await loginService.execute(email, password)

  return res.status(200).json(user)
}
