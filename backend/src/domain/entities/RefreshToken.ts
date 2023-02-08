import crypto from 'node:crypto'
import { Entity } from './Entity'

export type refreshtokenDTO = {
  _id: string
  refreshToken: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

export type createRefreshToken = Omit<
  refreshtokenDTO,
  '_id' | 'createdAt' | 'updatedAt'
>

export class RefreshToken extends Entity<refreshtokenDTO> {
  static create(createRefreshToken: createRefreshToken) {
    const _id = crypto.randomUUID()

    return new this({
      refreshToken: createRefreshToken.refreshToken,
      userId: createRefreshToken.userId,
      _id: _id,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  get id(): string {
    return this.props._id
  }

  get userId(): string {
    return this.props.userId
  }

  get refreshToken(): string {
    return this.props.refreshToken
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date {
    return this.props.updatedAt
  }
}
