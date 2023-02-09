import bcryptjs from 'bcryptjs'
import { IPasswordHandler } from '../../domain/ports/IPasswordHandler'

export class PasswordHandler implements IPasswordHandler {
  encrypt(password: string): Promise<string> {
    return bcryptjs.hash(password, 10)
  }
  validate(password: string, hashedPassword: string): Promise<boolean> {
    return bcryptjs.compare(password, hashedPassword)
  }
}
