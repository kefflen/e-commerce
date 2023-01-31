import { CreateProductService } from '../domain/services/product-services/CreateProductService'
import { productServiceDepedencies } from '../domain/services/_contracts/ProductService'
import { MongoProductRepository } from '../infra/mongo/repositories/MongoProductRepository'

type services = {
  createProducServicet: CreateProductService
}

let instance: services | null = null

export function productServicesFactory(): services {
  const depedencies: productServiceDepedencies = {
    productRepository: new MongoProductRepository(),
  }

  if (instance === null) {
    instance = {
      createProducServicet: new CreateProductService(depedencies),
    }
  }

  return instance
}
