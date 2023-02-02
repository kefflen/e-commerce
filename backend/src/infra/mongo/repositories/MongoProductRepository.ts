import { Product } from '../../../domain/entities/Product'
import { IProductRepository } from '../../../domain/repositories/IProductRepository'
import { repositoryOptions } from '../../../domain/repositories/_contracts/IRepository'
import { ProductModel } from '../models/ProductModel'

export class MongoProductRepository implements IProductRepository {
  async list(options: repositoryOptions<Product>): Promise<Product[]> {
    let query = ProductModel.find()

    if (options.pagination) {
      const { take, page } = options.pagination
      query = query.limit(take).skip((page - 1) * take)
    }

    if (options.where) {
      query.where(options.where)
    }

    const productsData = await query

    return productsData.map((productData) => new Product(productData.toJSON()))
  }

  async create(product: Product): Promise<Product> {
    const productData = new ProductModel(product.toJSON())
    const newProductData = await productData.save()

    return new Product(newProductData.toJSON())
  }

  async update(product: Product): Promise<Product | null> {
    const updatedProductData = await ProductModel.findOneAndUpdate(
      product.toJSON(),
    )

    if (!updatedProductData) return null

    return new Product(updatedProductData.toJSON())
  }

  async delete(id: string): Promise<void> {
    await ProductModel.deleteOne({ _id: id })
  }

  async getById(id: string): Promise<Product | null> {
    const productData = await ProductModel.findOne({ _id: id })

    if (!productData) return null

    return new Product(productData.toJSON())
  }

  async getBySlug(slug: string): Promise<Product | null> {
    const productData = await ProductModel.findOne({ slug })

    if (!productData) return null

    return new Product(productData.toJSON())
  }
}
