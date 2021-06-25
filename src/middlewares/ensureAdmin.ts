import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { ErrorProvider } from "../providers/ErrorProvider";
import { UsersRepository } from "../repositories/UsersRepository";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
  const { user_id } = request
  if (!user_id)
    throw new ErrorProvider('Invalid Request', 400)

  const usersRepository = getCustomRepository(UsersRepository)
  const user = await usersRepository.findOne(user_id)

  if (!user)
    throw new ErrorProvider('User not found', 404)

  if (!user.admin)
    throw new ErrorProvider('User is not admin', 403)


  return next()
}