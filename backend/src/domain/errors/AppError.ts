
export class AppError extends Error {
  readonly statusCode: number
  constructor(message: string, statusCode=500) {
    super(message)
    this.statusCode = statusCode
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
}