import 'express-async-errors'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import routes from './routes'
import { AppError } from '../domain/errors/AppError'

const server = express()

server.use(cors())
server.use(express.json())
server.use(routes)

server.use(
  (
    error: Error,
    request: Request,
    response: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    nextFunction: NextFunction,
  ) => {
    console.log(error)

    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        message: error.message,
      })
    } else {
      return response.status(500).json({
        message: 'Internal Server Error',
      })
    }
  },
)

export default server
