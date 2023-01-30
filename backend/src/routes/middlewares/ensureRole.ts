import { NextFunction, Request, Response } from 'express'
import { ROLES } from '../../domain/entities/User'
import { AppError } from '../../domain/errors/AppError'
import { userServiceFactory } from '../../factories'
const { getUserByIdService } = userServiceFactory()

export function ensureRole(role: ROLES) {
  return async (
    request: Request,
    response: Response,
    nextFunction: NextFunction,
  ) => {
    const userId = request.payload.userId
    if (!userId) throw Error('No user id')
    const user = await getUserByIdService.execute(userId)

    if (role === user.role) {
      nextFunction()
    } else {
      throw AppError.forbidden('You are not allowed to do that.')
    }
  }
}
