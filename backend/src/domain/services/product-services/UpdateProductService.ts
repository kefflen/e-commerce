import { Product, updateProductDTO } from '../../entities/Product'
import { AppError } from '../../errors/AppError'
import { ProductService } from '../_contracts/ProductService'

export class UpdateProductService extends ProductService {
  async execute(productDTO: updateProductDTO): Promise<Product> {
    const product = await this.productRepository.getById(productDTO._id)

    if (product === null) throw AppError.notFound('Product not found')

    const updatedProduct = product.update(productDTO)
    const savedProduct = await this.productRepository.update(updatedProduct)

    if (savedProduct === null) throw AppError.notFound('Product not found')

    return savedProduct
  }
}
