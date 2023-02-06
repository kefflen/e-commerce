import crypto from 'node:crypto'
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
  auth:{
    token: string,
    refreshToken: string
  }
  user: normalizedUserDTO
}

export class User {
  private readonly _id: string
  private readonly _firstName: string
  private readonly _email: string
  private readonly _password: string
  private readonly _lastName: string
  private readonly _mobile: string
  private readonly _role: ROLES
  private readonly _isBlocked: boolean
  private readonly _cart: string[]
  private readonly _wishlist: string[]
  private readonly createdAt: Date
  private readonly updatedAt: Date

  constructor(userDTO: userDTO) {
    this._id = userDTO._id
    this._firstName = userDTO.firstName
    this._email = userDTO.email
    this._password = userDTO.password
    this._lastName = userDTO.lastName
    this._mobile = userDTO.mobile
    this._role = userDTO.role
    this._isBlocked = false
    this._cart = userDTO.cart
    this._wishlist = userDTO.wishlist
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }
  get id(): string {
    return this._id
  }
  get firstName(): string {
    return this._firstName
  }
  get email(): string {
    return this._email
  }
  get password(): string {
    return this._password
  }
  get lastName(): string {
    return this._lastName
  }
  get mobile(): string {
    return this._mobile
  }
  get role(): ROLES {
    return this._role
  }
  get isBlocked(): boolean {
    return this._isBlocked
  }
  get cart(): string[] {
    return this._cart
  }
  get wishlist(): string[] {
    return this._wishlist
  }

  toJSON(): userDTO {
    return {
      _id: this._id,
      firstName: this.firstName,
      email: this.email,
      password: this.password,
      lastName: this.lastName,
      mobile: this.mobile,
      role: this.role,
      isBlocked: this.isBlocked,
      cart: [...this.cart],
      wishlist: [...this.wishlist],
      createdAt: new Date(this.createdAt),
      updatedAt: new Date(this.updatedAt),
    }
  }

  toNormalizedJSON(): normalizedUserDTO {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...normalizedUserDTO } = this.toJSON()

    return normalizedUserDTO
  }

  update(userDTO: Partial<userDTO>): User {
    return new User({
      _id: this._id,
      firstName: userDTO.firstName || this.firstName,
      email: userDTO.email || this.email,
      password: userDTO.password || this.password,
      lastName: userDTO.lastName || this.lastName,
      mobile: userDTO.mobile || this.mobile,
      role: userDTO.role || this.role,
      isBlocked: userDTO.isBlocked || this.isBlocked,
      cart: userDTO.cart || this.cart,
      wishlist: userDTO.wishlist || this.wishlist,
      createdAt: userDTO.createdAt || this.createdAt,
      updatedAt: userDTO.updatedAt || this.updatedAt,
    })
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
}
