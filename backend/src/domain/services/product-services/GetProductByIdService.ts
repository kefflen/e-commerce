import { Product } from '../../entities/Product'
import { AppError } from '../../errors/AppError'
import { ProductService } from '../_contracts/ProductService'

export class GetProductByIdService extends ProductService {
  async execute(id: string): Promise<Product> {
    const product = await this.productRepository.getById(id)

    if (product === null) throw AppError.notFound('Product not found')

    return product
  }
}