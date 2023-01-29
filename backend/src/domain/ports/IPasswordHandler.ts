export interface IPasswordHandler {
  encrypt(password: string): Promise<string>
  validate(password: string, hashedPassword: string): Promise<boolean>
}
