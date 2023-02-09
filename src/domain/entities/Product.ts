import crypto from 'crypto'
import { Entity } from './Entity'

type rating = {
  stars: number
  postedBy: string
}

export type productDTO = {
  _id: string
  title: string
  slug: string
  description: string
  price: number
  categoryId: string
  brand: string
  quantity: number
  imagesFilename: string[]
  color: string
  sold: number
  ratings: rating[]
  createdAt: Date
  updatedAt: Date
}

export type createProductDTO = Omit<
  productDTO,
  'createdAt' | 'updatedAt' | 'slug' | 'sold' | 'ratings' | '_id'
>

export type updateProductDTO = Omit<
  productDTO,
  'createdAt' | 'updatedAt' | 'slug' | 'sold' | 'ratings' | 'imagesFilename'
>

export class Product extends Entity<productDTO> {
  addImage(imageFilename: string): void {
    this.props.imagesFilename.push(imageFilename)
  }

  removeImage(imageFilename: string): void {
    this.props.imagesFilename.filter((path) => path !== imageFilename)
  }

  update(productDTO: Partial<Omit<productDTO, 'slug'>>): void {
    let slug: string

    if (productDTO.title) {
      slug = Product.slugfy(productDTO.title)
    } else {
      slug = this.slug
    }

    super.update({ ...productDTO, slug })
  }

  static create(productDTO: createProductDTO): Product {
    const slug = this.slugfy(productDTO.title)
    const _id = crypto.randomUUID()

    return new this({
      _id,
      title: productDTO.title,
      brand: productDTO.brand,
      categoryId: productDTO.categoryId,
      color: productDTO.color,
      description: productDTO.description,
      imagesFilename: productDTO.imagesFilename,
      price: productDTO.price,
      quantity: productDTO.quantity,
      ratings: [],
      slug,
      sold: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  private static slugfy(title: string): string {
    return title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
  }

  get id(): string {
    return this.props._id
  }
  get title(): string {
    return this.props.title
  }

  get slug(): string {
    return this.props.slug
  }

  get description(): string {
    return this.props.description
  }

  get price(): number {
    return this.props.price
  }

  get categoryId(): string {
    return this.props.categoryId
  }

  get brand(): string {
    return this.props.brand
  }

  get quantity(): number {
    return this.props.quantity
  }

  get imagesFilename(): string[] {
    return this.props.imagesFilename
  }

  get color(): string {
    return this.props.color
  }

  get sold(): number {
    return this.props.sold
  }

  get ratings(): rating[] {
    return this.props.ratings
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date {
    return this.props.updatedAt
  }
}
