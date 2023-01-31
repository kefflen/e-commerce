import { IProductRepository } from '../../repositories/IProductRepository'

export type productServiceDepedencies = {
  productRepository: IProductRepository
}

export abstract class ProductService {
  productRepository: IProductRepository

  constructor(depedencies: productServiceDepedencies) {
    this.productRepository = depedencies.productRepository
  }

  abstract execute(...args: unknown[]): Promise<unknown>
}
