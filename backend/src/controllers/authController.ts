import { Request, Response } from 'express'
import { AppError } from '../domain/errors/AppError'
import { authServicesFactory } from '../factories'

const { loginService, logoutService } = authServicesFactory()

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password)
    throw AppError.badRequest('Need a valid email or password')

  const user = await loginService.execute(email, password)

  return res.status(200).json(user)
}

export const logoutController = async (req: Request, res: Response) => {
  const { exp } = req.payload
  const jwtToken = req.headers.authorization?.split(' ')[1]
  if (!jwtToken) throw AppError.badRequest('No JWT token found')
  await logoutService.execute(jwtToken, exp)

  return res.sendStatus(200)
}
