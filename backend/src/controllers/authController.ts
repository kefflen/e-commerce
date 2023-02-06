import { Request, Response } from 'express'
import { AppError } from '../domain/errors/AppError'
import { authServicesFactory } from '../factories'

const { loginService, logoutService, refreshTokenService } = authServicesFactory()

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password)
    throw AppError.badRequest('Need a valid email or password')

  const user = await loginService.execute(email, password)

  return res.status(200).json(user)
}

export const logoutController = async (req: Request, res: Response) => {
  const { exp, userId } = req.payload
  const jwtToken = req.headers.authorization?.split(' ')[1]
  if (!jwtToken) throw AppError.badRequest('No JWT token found')
  await logoutService.execute(jwtToken, userId, exp)

  return res.sendStatus(200)
}

export const refreshTokenController = async (req: Request, res: Response) => {
  const { refreshToken } = req.body
  const tokens = await refreshTokenService.execute(refreshToken)

  return res.status(200).json(tokens)
}