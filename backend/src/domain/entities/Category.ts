import crypto from 'node:crypto'
import { Entity } from './Entity'

export type categoryDTO = {
  _id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export type createCategory = Omit<
  categoryDTO,
  '_id' | 'createdAt' | 'updatedAt'
>

export class Category extends Entity<categoryDTO> {

  static create(createCategory: createCategory) {
    const _id = crypto.randomUUID()

    return new this({
      name: createCategory.name,
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
