import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/Users/AuthenticateUserService";
import { CreateUserService } from "../services/Users/CreateUserService";
import { ListUsersService } from "../services/Users/ListUsersService";
import { ShowDetailsUserService } from "../services/Users/ShowDetailsUser";

class UsersController {
  async index(request: Request, response: Response): Promise<Response> {
    const name = request.query.name as string
    const listUsers = new ListUsersService()
    const users = await listUsers.execute(name)
    return response.json(users)
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const showUser = new ShowDetailsUserService()
    const user = await showUser.execute(id)
    return response.json(user)
  }

  async store(request: Request, response: Response): Promise<Response> {
    const { name, email, password, admin } = request.body

    const createUserService = new CreateUserService()
    const user = await createUserService.execute({ name, email, admin, password })
    delete user.password
    return response.status(201).json(user)
  }

  async authenticate(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const authenticateUserService = new AuthenticateUserService()
    const token = await authenticateUserService.execute(email, password)
    return response.status(200).json({ token })
  }
}

export default UsersController