import crypto from 'node:crypto'
import { Entity } from './Entity'

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

export class Brand extends Entity<brandDTO> {

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
    return this.props._id
  }
  get name(): string {
    return this.props.name
  }
  get createdAt(): Date {
    return this.props.createdAt
  }
  get updatedAt(): Date {
    return this.props.updatedAt
  }
}
