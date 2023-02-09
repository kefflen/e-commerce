import crypto from 'node:crypto'
import { Entity } from './Entity'
export enum ROLES {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export type userDTO = {
  _id: string
  firstName: string
  email: string
  password: string
  lastName: string
  mobile: string
  role: ROLES
  isBlocked: boolean
  cart: string[]
  wishlist: string[]
  createdAt: Date
  updatedAt: Date
}

export type normalizedUserDTO = Omit<userDTO, 'password'>

export type createUserDTO = Omit<
  userDTO,
  '_id' | 'cart' | 'wishlist' | 'role' | 'createdAt' | 'updatedAt' | 'isBlocked'
>

export type loggedInUserDTO = {
  auth: {
    token: string
    refreshToken: string
  }
  user: normalizedUserDTO
}

export class User extends Entity<userDTO> {
  toNormalizedJSON(): normalizedUserDTO {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...normalizedUserDTO } = this.toJSON()

    return structuredClone(normalizedUserDTO)
  }

  static create(createUserDTO: createUserDTO & { role?: ROLES }): User {
    const _id = crypto.randomUUID()

    return new this({
      _id,
      isBlocked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      cart: [],
      wishlist: [],
      role: createUserDTO.role || ROLES.USER,
      ...createUserDTO,
    })
  }

  get id(): string {
    return this.props._id
  }
  get firstName(): string {
    return this.props.firstName
  }
  get email(): string {
    return this.props.email
  }
  get password(): string {
    return this.props.password
  }
  get lastName(): string {
    return this.props.lastName
  }
  get mobile(): string {
    return this.props.mobile
  }
  get role(): ROLES {
    return this.props.role
  }
  get isBlocked(): boolean {
    return this.props.isBlocked
  }
  get cart(): string[] {
    return this.props.cart
  }
  get wishlist(): string[] {
    return this.props.wishlist
  }
  get createdAt(): Date {
    return this.props.createdAt
  }
  get updatedAt(): Date {
    return this.props.updatedAt
  }
}
