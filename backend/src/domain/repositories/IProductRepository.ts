import { Product } from '../entities/Product'
import { IRepository } from './_contracts/IRepository'

export interface IProductRepository extends IRepository<Product>{
  getBySlug(slug: string): Promise<Product|null>
}