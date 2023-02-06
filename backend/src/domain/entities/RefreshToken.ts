import crypto from 'node:crypto'

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

export class RefreshToken {
  private readonly props: refreshtokenDTO

  constructor(refreshtokenDTO: refreshtokenDTO) {
    this.props = structuredClone(refreshtokenDTO)
  }

  toJSON(): refreshtokenDTO {
    return structuredClone(this.props)
  }

  update(refreshtokenDTO: Partial<refreshtokenDTO>): RefreshToken {
    const updatedFields = Object.fromEntries(
      Object.entries(refreshtokenDTO).filter((entry) => entry[1] !== undefined),
    )

    return new RefreshToken({
      ...this.props,
      ...updatedFields,
    })
  }

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
