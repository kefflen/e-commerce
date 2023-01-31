import {
  CreateProductService,
  DeleteProductService,
  GetProductByIdService,
  ListProductsService,
  UpdateProductService,
} from '../domain/services/product-services'
import { productServiceDepedencies } from '../domain/services/_contracts/ProductService'
import { MongoProductRepository } from '../infra/mongo/repositories/MongoProductRepository'

type services = {
  createProducServicet: CreateProductService
  deleteProductService: DeleteProductService
  getProductByIdService: GetProductByIdService
  listProductsService: ListProductsService
  updateProductService: UpdateProductService
}

let instance: services | null = null

export function productServicesFactory(): services {
  const depedencies: productServiceDepedencies = {
    productRepository: new MongoProductRepository(),
  }

  if (instance === null) {
    instance = {
      createProducServicet: new CreateProductService(depedencies),
      deleteProductService: new DeleteProductService(depedencies),
      getProductByIdService: new GetProductByIdService(depedencies),
      listProductsService: new ListProductsService(depedencies),
      updateProductService: new UpdateProductService(depedencies),
    }
  }

  return instance
}
