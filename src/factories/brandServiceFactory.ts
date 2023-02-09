import { Brand } from '../domain/entities/Brand'
import {
  CreateBrandService,
  DeleteBrandService,
  GetBrandService,
  ListCategoriesService,
  UpdateBrandService,
} from '../domain/services/brand-services'
import { brandServiceDepedencies } from '../domain/services/_contracts/BrandService'
import { BrandModel } from '../infra/mongo/models/BrandModel'
import { MongoBrandRepository } from '../infra/mongo/repositories/MongoBrandRepository'

type services = {
  createBrandService: CreateBrandService
  deleteBrandService: DeleteBrandService
  getBrandService: GetBrandService
  listCategoriesService: ListCategoriesService
  updateBrandService: UpdateBrandService
}

export function brandServicesFactory(): services {
  const dependencies: brandServiceDepedencies = {
    brandRepository: new MongoBrandRepository(BrandModel, Brand),
  }

  return {
    createBrandService: new CreateBrandService(dependencies),
    deleteBrandService: new DeleteBrandService(dependencies),
    getBrandService: new GetBrandService(dependencies),
    listCategoriesService: new ListCategoriesService(dependencies),
    updateBrandService: new UpdateBrandService(dependencies),
  }
}
