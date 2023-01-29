import { ISessionManager, userPayload } from "../../domain/ports/ISessionManager";

export class SessionManager implements ISessionManager {
  createSession(payload: userPayload): Promise<string> {
    throw new Error("Method not implemented.");
  }
}