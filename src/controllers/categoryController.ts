import { Request, Response } from 'express'
import { categoryServicesFactory } from '../factories/categoryServiceFactory'

const {
  createCategoryService,
  deleteCategoryService,
  getCategoryService,
  listCategoriesService,
  updateCategoryService,
} = categoryServicesFactory()

export const createCategoryController = async (req: Request, res: Response) => {
  const { name } = req.body
  const category = await createCategoryService.execute(name)

  return res.status(201).json(category)
}

export const deleteCategoryController = async (req: Request, res: Response) => {
  const { categoryId } = req.params
  await deleteCategoryService.execute(categoryId)

  return res.status(200).send()
}

export const updateCategoryController = async (req: Request, res: Response) => {
  const { categoryId } = req.params
  const { name } = req.body

  const category = await updateCategoryService.execute({
    _id: categoryId,
    name: name,
  })

  return res.status(200).json(category)
}

export const listCategoryController = async (req: Request, res: Response) => {
  const categories = await listCategoriesService.execute()

  return res.status(200).json(categories)
}

export const getCategoryByIdController = async (
  req: Request,
  res: Response,
) => {
  const { categoryId } = req.params

  const category = await getCategoryService.execute(categoryId)

  return res.status(200).json(category)
}
