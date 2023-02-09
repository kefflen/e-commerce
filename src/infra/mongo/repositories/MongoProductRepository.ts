import { Product, productDTO } from '../../../domain/entities/Product'
import { IProductRepository } from '../../../domain/repositories/IProductRepository'
import { ProductModel } from '../models/ProductModel'
import { MongoRepository } from './MongoRepository'

export class MongoProductRepository
  extends MongoRepository<typeof ProductModel, Product, productDTO>
  implements IProductRepository
{
  async getBySlug(slug: string): Promise<Product | null> {
    const data = await this.model.findOne({ slug })

    if (!data) return null

    return new this.cls(data.toObject())
  }
}
