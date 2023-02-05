import { Router } from 'express'
import {
  createBrandController,
  deleteBrandController,
  getBrandByIdController,
  listBrandController,
  updateBrandController,
} from '../controllers/brandController'

const brandRoutes = Router()

brandRoutes.get('/', listBrandController)
brandRoutes.get('/:brandId', getBrandByIdController)
brandRoutes.post('/', createBrandController)
brandRoutes.post('/:brandId', updateBrandController)
brandRoutes.delete('/', deleteBrandController)

export default brandRoutes
