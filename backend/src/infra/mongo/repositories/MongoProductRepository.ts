import { Product } from '../../../domain/entities/Product'
import { IProductRepository } from '../../../domain/repositories/IProductRepository'

export class MongoProductRepository implements IProductRepository {
  getProducts(): Promise<Product[]> {
    throw new Error('Method not implemented.')
  }
  createProduct(product: Product): Promise<Product> {
    throw new Error('Method not implemented.')
  }
  updateProduct(id: string, product: Product): Promise<Product> {
    throw new Error('Method not implemented.')
  }
  deleteProduct(id: string): Promise<Product> {
    throw new Error('Method not implemented.')
  }
  getProductById(id: string): Promise<Product> {
    throw new Error('Method not implemented.')
  }
  getProductBySlug(slug: string): Promise<Product> {
    throw new Error('Method not implemented.')
  }

}