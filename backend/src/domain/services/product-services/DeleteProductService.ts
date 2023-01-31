import { ProductService } from "../_contracts/ProductService";

export class DeleteProductService extends ProductService {
  async execute(productId: string): Promise<void> {
    await this.productRepository.delete(productId)
  }
}