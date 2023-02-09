import { Router } from 'express'
import {
  createCategoryController,
  deleteCategoryController,
  getCategoryByIdController,
  listCategoryController,
  updateCategoryController,
} from '../controllers/categoryController'

const categoryRoutes = Router()

categoryRoutes.get('/', listCategoryController)
categoryRoutes.get('/:categoryId', getCategoryByIdController)
categoryRoutes.post('/', createCategoryController)
categoryRoutes.post('/:categoryId', updateCategoryController)
categoryRoutes.delete('/', deleteCategoryController)

export default categoryRoutes
