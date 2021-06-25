import { NextFunction, Request, Response } from "express";
import { ErrorProvider } from "../providers/ErrorProvider";
import { TokenProvider } from "../providers/TokenProvider/TokenProvider";

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers
  if (!authorization)
    throw new ErrorProvider('Token not provided.', 401)

  const [, token] = authorization.split(' ')

  const tokenProvider = new TokenProvider()
  const { jwtError, result } = tokenProvider.verify(token)

  if (jwtError)
    throw new ErrorProvider(jwtError, 401)

  request.user_id = result.sub as string
  return next()
}