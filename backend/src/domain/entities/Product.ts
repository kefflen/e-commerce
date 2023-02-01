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
  private _id: string
  private readonly _title: string
  private readonly _slug: string
  private readonly _description: string
  private readonly _price: number
  private readonly _categoryId: string
  private readonly _brand: string
  private readonly _quantity: number
  private readonly _imagesFilename: string[]
  private readonly _color: string
  private readonly _sold: number
  private readonly _ratings: rating[]
  private readonly _createdAt: Date
  private readonly _updatedAt: Date

  constructor(productDTO: productDTO) {
    this._id = productDTO._id
    this._title = productDTO.title
    this._slug = productDTO.slug
    this._description = productDTO.description
    this._price = productDTO.price
    this._categoryId = productDTO.categoryId
    this._brand = productDTO.brand
    this._quantity = productDTO.quantity
    this._imagesFilename = productDTO.imagesFilename
    this._color = productDTO.color
    this._sold = productDTO.sold
    this._ratings = productDTO.ratings
    this._createdAt = productDTO.createdAt
    this._updatedAt = productDTO.updatedAt
  }

  toJSON(): productDTO {
    return {
      _id: this.id,
      title: this.title,
      brand: this.brand,
      categoryId: this.categoryId,
      color: this.color,
      description: this.description,
      imagesFilename: [...this.imagesFilename],
      price: this.price,
      quantity: this.quantity,
      ratings: [...this.ratings],
      slug: this.slug,
      sold: this.sold,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
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

    return new Product({
      _id: this.id,
      title: productDTO.title || this.title,
      brand: productDTO.brand || this.brand,
      categoryId: productDTO.categoryId || this.categoryId,
      color: productDTO.color || this.color,
      description: productDTO.description || this.description,
      imagesFilename: productDTO.imagesFilename || this.imagesFilename,
      price: productDTO.price || this.price,
      quantity: productDTO.quantity || this.quantity,
      ratings: productDTO.ratings || this.ratings,
      slug: slug,
      sold: productDTO.sold || this.sold,
      createdAt: productDTO.createdAt || this.createdAt,
      updatedAt: productDTO.updatedAt || this.updatedAt,
    })
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
    return this._id
  }
  get title(): string {
    return this._title
  }

  get slug(): string {
    return this._slug
  }

  get description(): string {
    return this._description
  }

  get price(): number {
    return this._price
  }

  get categoryId(): string {
    return this._categoryId
  }

  get brand(): string {
    return this._brand
  }

  get quantity(): number {
    return this._quantity
  }

  get imagesFilename(): string[] {
    return this._imagesFilename
  }

  get color(): string {
    return this._color
  }

  get sold(): number {
    return this._sold
  }

  get ratings(): rating[] {
    return this._ratings
  }

  get createdAt(): Date {
    return this._createdAt
  }

  get updatedAt(): Date {
    return this._updatedAt
  }
}
