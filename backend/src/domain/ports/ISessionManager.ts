export type userPayload = {
  userId: string
}

export type decodedPayload = userPayload & {
  iat: number
  exp: number
  isRefreshToken?: boolean
}

export interface ISessionManager {
  createSession(payload: userPayload): {
    token: string
    refreshToken: string
  }
  verifySession(id: string): decodedPayload | null
}
