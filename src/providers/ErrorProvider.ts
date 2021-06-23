class ErrorProvider {
  readonly statusCode: number
  readonly message: string

  constructor(message: string, statusCode: number = 400) {
    this.message = message
    this.statusCode = statusCode
  }
}

export { ErrorProvider }