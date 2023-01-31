import { Product } from '../../entities/Product'
import { ProductService } from '../_contracts/ProductService'

export class ListProductsService extends ProductService {
  async execute(): Promise<Product[]> {
    const products = await this.productRepository.list()

    return products
  }
}