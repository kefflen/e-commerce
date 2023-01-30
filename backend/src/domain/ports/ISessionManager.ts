export type userPayload = {
  userId: string
}

export type decodedPayload = userPayload & { iat: number; exp: number }

export interface ISessionManager {
  createSession(payload: userPayload): string
  verifySession(id: string): decodedPayload | null
}
