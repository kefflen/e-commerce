import { NextFunction, Request, Response } from 'express'
import { AppError } from '../../domain/errors/AppError'
import { authServicesFactory } from '../../factories/authServicesFactory'

const { verifyAuthTokenService } = authServicesFactory()

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const bearerToken = request.headers.authorization
  if (!bearerToken) throw AppError.unauthorized('Need to authenticate')
  const payload = await verifyAuthTokenService.execute(bearerToken)
  request.payload = payload
  next()
}
