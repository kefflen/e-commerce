import crypto from 'node:crypto'

export type brandDTO = {
  _id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export type createBrand = Omit<
  brandDTO,
  '_id' | 'createdAt' | 'updatedAt'
>

export class Brand {
  private readonly _id: string
  private readonly _name: string
  private readonly _createdAt: Date
  private readonly _updatedAt: Date

  constructor(brandDTO: brandDTO) {
    this._id = brandDTO._id
    this._name = brandDTO.name
    this._createdAt = brandDTO.createdAt
    this._updatedAt = brandDTO.updatedAt
  }

  toJSON(): brandDTO {
    return {
      _id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  update(brandDTO: Partial<brandDTO>): Brand {
    return new Brand({
      _id: brandDTO._id || this.id,
      name: brandDTO.name || this.name,
      createdAt: brandDTO.createdAt || this.createdAt,
      updatedAt: brandDTO.updatedAt || this.updatedAt,
    })
  }

  static create(createBrand: createBrand) {
    const _id = crypto.randomUUID()

    return new this({
      name: createBrand.name,
      _id: _id,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  get id(): string {
    return this._id
  }
  get name(): string {
    return this._name
  }
  get createdAt(): Date {
    return this._createdAt
  }
  get updatedAt(): Date {
    return this._updatedAt
  }
}
