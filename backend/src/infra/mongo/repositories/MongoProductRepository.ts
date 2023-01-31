import { Product } from '../../../domain/entities/Product'
import { IProductRepository } from '../../../domain/repositories/IProductRepository'
import { ProductModel } from '../models/ProductModel'

export class MongoProductRepository implements IProductRepository {
  async getProducts(): Promise<Product[]> {
    const productsData = await ProductModel.find()

    return productsData.map(product => new Product(product.toJSON()))
  }

  async createProduct(product: Product): Promise<Product> {
    const productData = new ProductModel(product.toJSON())
    const newProductData = await productData.save()

    return new Product(newProductData.toJSON())
  }

  async updateProduct(product: Product): Promise<Product|null> {
    const updatedProductData = await ProductModel.findOneAndUpdate(product.toJSON())

    if (!updatedProductData) return null

    return new Product(updatedProductData.toJSON())
  }

  async deleteProduct(id: string): Promise<void> {
    await ProductModel.deleteOne({ _id: id })
  }

  async getProductById(id: string): Promise<Product|null> {
    const productData = await ProductModel.findOne({ _id: id })

    if (!productData) return null

    return new Product(productData.toJSON())
  }

  async getProductBySlug(slug: string): Promise<Product|null> {
    const productData = await ProductModel.findOne({ slug })

    if (!productData) return null

    return new Product(productData.toJSON())
  }

}