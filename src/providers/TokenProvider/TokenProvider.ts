import { JwtPayload, sign, verify } from 'jsonwebtoken'
import { I_ResponseCreate, I_ResponseVerify } from './I_TokenProvider'

class TokenProvider {

  create(id: string, email: string): I_ResponseCreate {
    const token = sign({
      email: email
    }, '41e60dee3d2e8c8b71264959456445f8b8debb24', {
      expiresIn: '1d',
      subject: id
    })
    return { token }
  }

  verify(token: string): I_ResponseVerify {
    let result: JwtPayload | string
    let jwtError: string

    try {
      result = verify(token, '41e60dee3d2e8c8b71264959456445f8b8debb24')
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