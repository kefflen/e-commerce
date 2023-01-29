export class AppError {
  readonly statusCode: number
  readonly message: string

  constructor(message: string, statusCode = 500) {
    this.statusCode = statusCode
    this.message = message
  }

  static badRequest(message: string) {
    return new this(message, 400)
  }

  static serverError(message: string) {
    return new this(message, 500)
  }

  static notFound(message: string) {
    return new this(message, 404)
  }

  static conflict(message: string) {
    return new this(message, 409)
  }
}
