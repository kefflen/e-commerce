import jwt from 'jsonwebtoken'
import {
  ISessionManager,
  userPayload,
} from '../../domain/ports/ISessionManager'

export class SessionManager implements ISessionManager {
  createSession(payload: userPayload): string {
    const SECRET_KEY = process.env.JWT_SECRET_KEY
    if (!SECRET_KEY) throw new Error('Missing SECRET_KEY')

    return jwt.sign(payload, SECRET_KEY, {
      expiresIn: '1d',
    })
  }
}
