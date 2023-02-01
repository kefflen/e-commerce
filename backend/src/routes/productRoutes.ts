import { Router } from 'express'
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../controllers/productController'

const productRoutes = Router()

productRoutes.get('/', getProducts)
productRoutes.post('/', createProduct)
productRoutes.get('/:productId', getProductById)
productRoutes.post('/:productId', updateProduct)
productRoutes.delete('/:productId', deleteProduct)

export default productRoutes
