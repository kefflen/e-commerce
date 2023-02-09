export abstract class Entity<D extends { _id: string }, U = D> {
  protected props: D

  constructor(props: D) {
    this.props = structuredClone(props)
  }

  toJSON(): D {
    return structuredClone(this.props)
  }

  update(props: Partial<U>) {
    const updatedProps = Object.fromEntries(
      Object.entries(props).filter((entry) => entry[1] !== undefined),
    )
    Object.assign(this.props, updatedProps)
  }

  get id(): string {
    return this.props._id
  }
}
