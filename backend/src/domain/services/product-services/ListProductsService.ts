import { Product } from '../../entities/Product'
import { ProductService } from '../_contracts/ProductService'

export class ListProductsService extends ProductService {
  async execute(page: number): Promise<Product[]> {
    const products = await this.productRepository.list({
      pagination: {
        take: 15,
        page,
      },
    })

    return products
  }
}
