import { JwtPayload } from "jsonwebtoken";

interface I_ResponseVerify {
  result: JwtPayload | string
  jwtError: string
}
interface I_ResponseCreate {
  token: string
}

export {
  I_ResponseVerify,
  I_ResponseCreate
}