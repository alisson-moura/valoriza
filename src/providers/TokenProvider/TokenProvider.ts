import { JwtPayload, sign, verify } from 'jsonwebtoken'
import { I_ResponseCreate, I_ResponseVerify } from './I_TokenProvider'

class TokenProvider {
  private secret: string

  constructor() {
    this.secret = process.env.JWT_SECRET
  }

  create(id: string, email: string): I_ResponseCreate {
    const token = sign({
      email: email
    }, this.secret, {
      expiresIn: '1d',
      subject: id
    })
    return { token }
  }

  verify(token: string): I_ResponseVerify {
    let result: JwtPayload | string
    let jwtError: string

    try {
      result = verify(token, this.secret)
    } catch (err) {
      jwtError = err.message
    }

    return {
      jwtError,
      result
    }
  }

}

export { TokenProvider }