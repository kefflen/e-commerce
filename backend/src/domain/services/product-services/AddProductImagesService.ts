import { Product } from '../../entities/Product'
import { AppError } from '../../errors/AppError'
import { ProductService } from '../_contracts/ProductService'

export class AddProductImageService extends ProductService {
  async execute(productId: string, imageFilename: string): Promise<Product> {
    const product = await this.productRepository.getById(productId)

    if (!product) throw AppError.notFound('Product not found')

    const newProduct = product.addImage(imageFilename)
    const updatedProduct = await this.productRepository.update(newProduct)
    if (!updatedProduct) throw AppError.serverError('Product not found')

    return updatedProduct
  }
}
