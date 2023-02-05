import { Request, Response } from 'express'
import { brandServicesFactory } from '../factories/brandServiceFactory'

const {
  createBrandService,
  deleteBrandService,
  getBrandService,
  listCategoriesService,
  updateBrandService,
} = brandServicesFactory()

export const createBrandController = async (req: Request, res: Response) => {
  const { name } = req.body
  const brand = await createBrandService.execute(name)

  return res.status(201).json(brand)
}

export const deleteBrandController = async (req: Request, res: Response) => {
  const { brandId } = req.params
  await deleteBrandService.execute(brandId)

  return res.status(200).send()
}

export const updateBrandController = async (req: Request, res: Response) => {
  const { brandId } = req.params
  const { name } = req.body

  const brand = await updateBrandService.execute({
    _id: brandId,
    name: name,
  })

  return res.status(200).json(brand)
}

export const listBrandController = async (req: Request, res: Response) => {
  const categories = await listCategoriesService.execute()

  return res.status(200).json(categories)
}

export const getBrandByIdController = async (
  req: Request,
  res: Response,
) => {
  const { brandId } = req.params

  const brand = await getBrandService.execute(brandId)

  return res.status(200).json(brand)
}
