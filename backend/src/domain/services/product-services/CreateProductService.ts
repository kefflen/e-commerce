import { createProductDTO, Product } from '../../entities/Product'
import { ProductService } from '../_contracts/ProductService'

export class CreateProductService extends ProductService {
  async execute(createProductDTO: createProductDTO): Promise<Product> {
    const product = Product.create(createProductDTO)
    const newProduct = await this.productRepository.createProduct(product)

    return newProduct
  }
}