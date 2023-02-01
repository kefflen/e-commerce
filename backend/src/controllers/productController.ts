import fs from 'fs'
import path from 'path'
import { Request, Response } from 'express'
import { AppError } from '../domain/errors/AppError'
import { productServicesFactory } from '../factories'

const {
  createProducService,
  deleteProductService,
  getProductByIdService,
  listProductsService,
  updateProductService,
  addProductImageService,
} = productServicesFactory()

export const getProducts = async (req: Request, res: Response) => {
  const products = await listProductsService.execute()
  res.json(products)
}

export const getProductById = async (req: Request, res: Response) => {
  const product = await getProductByIdService.execute(req.params.id)

  res.json(product)
}

export const createProduct = async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[] | null

  try {
    if (!files) throw AppError.badRequest('Need to upload images')

    const imagesFilename = files.map((file) => file.filename)
    const { title, brand, categoryId, color, description, price, quantity } =
      req.body

    const newProduct = await createProducService.execute({
      title,
      brand,
      categoryId,
      color,
      description,
      imagesFilename,
      price,
      quantity,
    })

    return res.status(201).json(newProduct)
  } catch (error) {
    if (files) {
      for (const file of files) {
        fs.unlinkSync(
          path.join(__dirname, '..', '..', 'public', 'uploads', file.filename),
        )
      }
    }

    throw error
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  const { productId } = req.params
  const { title, brand, categoryId, color, description, price, quantity } =
    req.body

  const updatedProduct = await updateProductService.execute({
    _id: productId,
    title,
    brand,
    categoryId,
    color,
    description,
    price,
    quantity,
  })

  return res.json(updatedProduct)
}

export const deleteProduct = async (req: Request, res: Response) => {
  const { productId } = req.params
  await deleteProductService.execute(productId)

  return res.sendStatus(204)
}

export const addProductImageController = async (
  req: Request,
  res: Response,
) => {
  const file = req.file
  if (!file) throw AppError.badRequest('File not found')

  const { productId } = req.params
  const updatedProduct = await addProductImageService.execute(
    productId,
    file.filename,
  )

  return res.json(updatedProduct)
}
