import { Product } from '../../entities/Product'
import {
  IQueryOptions,
  ISortingsOptions,
} from '../../repositories/_contracts/IRepository'
import { ProductService } from '../_contracts/ProductService'

export class ListProductsService extends ProductService {
  async execute(
    page: number,
    findQuery: IQueryOptions<Product>,
    sortings: ISortingsOptions<Product>,
  ): Promise<Product[]> {
    const products = await this.productRepository.list({
      pagination: {
        take: 15,
        page,
      },
      where: findQuery,
      sortings,
    })

    return products
  }
}
