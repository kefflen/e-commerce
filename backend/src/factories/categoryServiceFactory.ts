import {
  CreateCategoryService,
  DeleteCategoryService,
  GetCategoryService,
  ListCategoriesService,
  UpdateCategoryService,
} from '../domain/services/category-services'
import { categoryServiceDepedencies } from '../domain/services/_contracts/CategoryService'
import { MongoCategoryRepository } from '../infra/mongo/repositories/MongoCategoryRepository'

type services = {
  createCategoryService: CreateCategoryService
  deleteCategoryService: DeleteCategoryService
  getCategoryService: GetCategoryService
  listCategoriesService: ListCategoriesService
  updateCategoryService: UpdateCategoryService
}

export function categoryServicesFactory(): services {
  const dependencies: categoryServiceDepedencies = {
    categoryRepository: new MongoCategoryRepository(),
  }

  return {
    createCategoryService: new CreateCategoryService(dependencies),
    deleteCategoryService: new DeleteCategoryService(dependencies),
    getCategoryService: new GetCategoryService(dependencies),
    listCategoriesService: new ListCategoriesService(dependencies),
    updateCategoryService: new UpdateCategoryService(dependencies),
  }
}
