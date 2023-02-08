import { Document, Model, SortOrder } from 'mongoose'
import { Entity } from '../../../domain/entities/Entity'
import {
  IRepository,
  repositoryOptions,
} from '../../../domain/repositories/_contracts/IRepository'

/** Generics
 * M: Mongoose model
 * E: Entity
 * D: EntityDTO
 */
export abstract class MongoRepository<
  //TODO: M extends Model<D>
  M extends Model<any>,
  E extends Entity<D>,
  D extends { _id: string },
> implements IRepository<E>
{
  protected readonly model: M
  protected readonly cls: new (dto: D) => E

  constructor(model: M, cls: new (dto: D) => E) {
    this.model = model
    this.cls = cls
  }

  async create(entitie: E): Promise<E> {
    const data = new this.model(entitie.toJSON())
    const savedData = await data.save()

    return new this.cls(savedData.toObject())
  }

  async list(options: repositoryOptions<E>): Promise<E[]> {
    let query = this.model.find()

    if (options.pagination) {
      const { take, page } = options.pagination
      query = query.limit(take).skip((page - 1) * take)
    }

    if (options.where) {
      query.where(options.where)
    }

    if (options.sortings) {
      query.sort(options.sortings as { [k: string]: SortOrder })
    }

    const dataList = await query

    return dataList.map((data) => new this.cls(data.toObject()))
  }

  async update(entitie: E): Promise<E | null> {
    const updatedData = await this.model.findOneAndUpdate(entitie.toJSON())

    if (!updatedData) return null

    return new this.cls(updatedData.toObject())
  }

  async delete(id: E['id']): Promise<void> {
    await this.model.deleteOne({ _id: id })
  }

  async getById(id: E['id']): Promise<E | null> {
    const data = await this.model.findOne({ _id: id })

    if (!data) return null

    return new this.cls(data.toObject())
  }
}
