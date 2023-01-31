import { Product } from '../entities/Product'

export interface IProductRepository {
  getProducts(): Promise<Array<Product>>
  createProduct(product: Product): Promise<Product>
  updateProduct(id: string, product: Product): Promise<Product>
  deleteProduct(id: string): Promise<Product>
  getProductById(id: string): Promise<Product>
  getProductBySlug(slug: string): Promise<Product>
}