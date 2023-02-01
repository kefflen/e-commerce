import {
  CreateProductService,
  DeleteProductService,
  GetProductByIdService,
  ListProductsService,
  UpdateProductService,
  AddProductImageService,
} from '../domain/services/product-services'
import { productServiceDepedencies } from '../domain/services/_contracts/ProductService'
import { MongoProductRepository } from '../infra/mongo/repositories/MongoProductRepository'

type services = {
  createProducService: CreateProductService
  deleteProductService: DeleteProductService
  getProductByIdService: GetProductByIdService
  listProductsService: ListProductsService
  updateProductService: UpdateProductService
  addProductImageService: AddProductImageService
}

let instance: services | null = null

export function productServicesFactory(): services {
  const depedencies: productServiceDepedencies = {
    productRepository: new MongoProductRepository(),
  }

  if (instance === null) {
    instance = {
      createProducService: new CreateProductService(depedencies),
      deleteProductService: new DeleteProductService(depedencies),
      getProductByIdService: new GetProductByIdService(depedencies),
      listProductsService: new ListProductsService(depedencies),
      updateProductService: new UpdateProductService(depedencies),
      addProductImageService: new AddProductImageService(depedencies),
    }
  }

  return Object.freeze(instance)
}
