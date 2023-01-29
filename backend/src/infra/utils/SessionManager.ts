import jwt from 'jsonwebtoken'
import {
  ISessionManager,
  userPayload,
} from '../../domain/ports/ISessionManager'

export class SessionManager implements ISessionManager {
  createSession(payload: userPayload): string {
    return jwt.sign(payload, process.env.JWT_SECRET||'', {
      expiresIn: '1d',
    })
  }
}
