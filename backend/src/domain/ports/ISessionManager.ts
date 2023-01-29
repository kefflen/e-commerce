export type userPayload = {
  id: string
}

export interface ISessionManager {
  createSession(payload: userPayload): string
}
