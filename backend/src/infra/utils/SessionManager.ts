import jwt from 'jsonwebtoken'
import {
  decodedPayload,
  ISessionManager,
  userPayload,
} from '../../domain/ports/ISessionManager'

export class SessionManager implements ISessionManager {
  createSession(payload: userPayload): string {
    const SECRET_KEY = process.env.SECRET_KEY
    if (!SECRET_KEY) throw new Error('Missing SECRET_KEY')

    return jwt.sign(payload, SECRET_KEY, {
      expiresIn: '1h',
    })
  }

  verifySession(token: string): decodedPayload | null {
    const SECRET_KEY = process.env.SECRET_KEY
    if (!SECRET_KEY) throw new Error('Missing SECRET_KEY')

    try {
      const payload = jwt.verify(token, SECRET_KEY) as decodedPayload

      return payload
    } catch (err) {
      return null
    }
  }
}
