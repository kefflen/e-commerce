import { Router } from 'express'
import { createCategoryController, deleteCategoryController, getCategoryById, listCategoryController, updateCategoryController } from '../controllers/categoryController'

const categoryRoutes = Router()

categoryRoutes.get('/', listCategoryController)
categoryRoutes.get('/:categoryId', getCategoryById)
categoryRoutes.post('/', createCategoryController)
categoryRoutes.post('/:categoryId', updateCategoryController)
categoryRoutes.delete('/', deleteCategoryController)

export default categoryRoutes