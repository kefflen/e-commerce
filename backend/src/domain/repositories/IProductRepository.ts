import { Product } from '../entities/Product'

export interface IProductRepository {
  getProducts(): Promise<Array<Product>>
  createProduct(product: Product): Promise<Product>
  updateProduct(product: Product|null): Promise<Product|null>
  deleteProduct(id: string): Promise<void>
  getProductById(id: string): Promise<Product|null>
  getProductBySlug(slug: string): Promise<Product|null>
}