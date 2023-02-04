import { Router } from 'express'
import {
  addProductImageController,
  createProductController,
  deleteProductController,
  getProductById,
  getProductsController,
  updateProductController,
} from '../controllers/productController'
import { upload } from './middlewares/uploads'

const productRoutes = Router()

productRoutes.get('/', getProductsController)
productRoutes.post('/', upload.array('images'), createProductController)
productRoutes.get('/:productId', getProductById)
productRoutes.post('/:productId', updateProductController)
productRoutes.delete('/:productId', deleteProductController)
productRoutes.put('/:productId/add-image', addProductImageController)

export default productRoutes
