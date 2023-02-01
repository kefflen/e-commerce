import { Router } from 'express'
import {
  addProductImageController,
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../controllers/productController'
import { upload } from './middlewares/uploads'

const productRoutes = Router()

productRoutes.get('/', getProducts)
productRoutes.post('/', upload.array('images'), createProduct)
productRoutes.get('/:productId', getProductById)
productRoutes.post('/:productId', updateProduct)
productRoutes.delete('/:productId', deleteProduct)
productRoutes.put('/:productId/add-image', addProductImageController)

export default productRoutes
