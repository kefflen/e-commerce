import { Product } from '../../entities/Product'
import { IQueryOptions } from '../../repositories/_contracts/IRepository'
import { ProductService } from '../_contracts/ProductService'

export class ListProductsService extends ProductService {
  async execute(
    page: number,
    findQuery: IQueryOptions<Product>,
  ): Promise<Product[]> {
    const products = await this.productRepository.list({
      pagination: {
        take: 15,
        page,
      },
      where: findQuery,
    })

    return products
  }
}
