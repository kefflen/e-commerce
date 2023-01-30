
declare namespace Express {
  export interface Request {
    payload: {
      userId: string,
      exp: number,
      iat: number
    }
  }
}
