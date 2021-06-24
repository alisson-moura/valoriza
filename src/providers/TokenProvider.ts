import { sign } from 'jsonwebtoken'

class TokenProvider {
  create(id: string, email: string): string {
    const token = sign({
      email: email,
    }, '41e60dee3d2e8c8b71264959456445f8b8debb24', {
      expiresIn: '1d',
      subject: id
    })
    return token
  }
}

export { TokenProvider }