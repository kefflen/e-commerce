import crypto from 'node:crypto'

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

export class Category {
  private readonly _id: string
  private readonly _name: string
  private readonly _createdAt: Date
  private readonly _updatedAt: Date

  constructor(categoryDTO: categoryDTO) {
    this._id = categoryDTO._id
    this._name = categoryDTO.name
    this._createdAt = categoryDTO.createdAt
    this._updatedAt = categoryDTO.updatedAt
  }

  toJSON(): categoryDTO {
    return {
      _id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  update(categoryDTO: Partial<categoryDTO>): Category {
    return new Category({
      _id: categoryDTO._id || this.id,
      name: categoryDTO.name || this.name,
      createdAt: categoryDTO.createdAt || this.createdAt,
      updatedAt: categoryDTO.updatedAt || this.updatedAt,
    })
  }

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
