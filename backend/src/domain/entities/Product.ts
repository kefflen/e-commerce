import crypto from 'crypto'

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

export class Product {
  private readonly dto: productDTO
  constructor(productDTO: productDTO) {
    this.dto = {...productDTO}
  }

  toJSON(): productDTO {
    return structuredClone(this.dto)
  }

  addImage(imageFilename: string): Product {
    const { imagesFilename, ...rest } = this.toJSON()

    return new Product({
      ...rest,
      imagesFilename: [...imagesFilename, imageFilename],
    })
  }

  removeImage(imageFilename: string): Product {
    const { imagesFilename, ...rest } = this.toJSON()
    const newImagesFilename = imagesFilename.filter(
      (path) => path !== imageFilename,
    )

    return new Product({ ...rest, imagesFilename: newImagesFilename })
  }

  update(productDTO: Partial<Omit<productDTO, 'slug'>>): Product {
    let slug: string

    if (productDTO.title) {
      slug = Product.slugfy(productDTO.title)
    } else {
      slug = this.slug
    }

    const updateDTO = Object.fromEntries(
      Object.entries(productDTO).filter((entry) => entry[1] !== undefined),
    )

    return new Product({ ...this.dto, ...updateDTO, slug })
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
    return this.dto._id
  }
  get title(): string {
    return this.dto.title
  }

  get slug(): string {
    return this.dto.slug
  }

  get description(): string {
    return this.dto.description
  }

  get price(): number {
    return this.dto.price
  }

  get categoryId(): string {
    return this.dto.categoryId
  }

  get brand(): string {
    return this.dto.brand
  }

  get quantity(): number {
    return this.dto.quantity
  }

  get imagesFilename(): string[] {
    return this.dto.imagesFilename
  }

  get color(): string {
    return this.dto.color
  }

  get sold(): number {
    return this.dto.sold
  }

  get ratings(): rating[] {
    return this.dto.ratings
  }

  get createdAt(): Date {
    return this.dto.createdAt
  }

  get updatedAt(): Date {
    return this.dto.updatedAt
  }
}
