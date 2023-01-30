export type userPayload = {
  id: string
}

export interface ISessionManager {
  createSession(payload: userPayload): string
  verifySession(id: string): userPayload|null
}
