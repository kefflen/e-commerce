export type userDTO = {
  _id: string
  firstName: string
  email: string
  password: string
  lastName: string
  mobile: string
}

export type normalizedUserDTO = Omit<userDTO, 'password'>

export type createUserDTO = Omit<userDTO, '_id'> & {
  confirmPassword: string
}

export type loggedInUserDTO = {
  token: string
  user: normalizedUserDTO
}


export class User {
  private readonly _id: string
  private readonly _firstName: string
  private readonly _email: string
  private readonly _password: string
  private readonly _lastName: string
  private readonly _mobile: string

  constructor(userDTO: userDTO) {
    this._id = userDTO._id
    this._firstName = userDTO.firstName
    this._email = userDTO.email
    this._password = userDTO.password
    this._lastName = userDTO.lastName
    this._mobile = userDTO.mobile
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

  toJSON(): userDTO {
    return {
      _id: this._id,
      firstName: this.firstName,
      email: this.email,
      password: this.password,
      lastName: this.lastName,
      mobile: this.mobile
    }
  }

  toNormalizedJSON(): normalizedUserDTO {
    const { password, ...normalizedUserDTO} = this.toJSON()
    return normalizedUserDTO
  }

  update(userDTO: Partial<userDTO>): User {
    return new User({
      _id: this._id,
      firstName: userDTO.firstName || this.firstName,
      email: userDTO.email || this.email,
      password: userDTO.password || this.password,
      lastName: userDTO.lastName || this.lastName,
      mobile: userDTO.mobile || this.mobile
    })
  }
}
