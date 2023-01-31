import { Product } from '../entities/Product'

export interface IProductRepository {
  getProducts(): Promise<Array<Product>>
  createProduct(product: Product): Promise<Product>
  updateProduct(id: string, product: Product|null): Promise<Product>
  deleteProduct(id: string): Promise<void>
  getProductById(id: string): Promise<Product|null>
  getProductBySlug(slug: string): Promise<Product|null>
}