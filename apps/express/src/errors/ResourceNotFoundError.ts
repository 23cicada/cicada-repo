class ResourceNotFoundError extends Error {
  public statusCode: number

  constructor(message: string) {
    super(message)
    this.statusCode = 400
    this.name = "ResourceNotFoundError"
  }
}

export default ResourceNotFoundError
