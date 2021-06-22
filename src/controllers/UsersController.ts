import { Request, Response } from "express";
import { CreateUserService } from "../services/Users/CreateUserService";

class UsersController {
  async store(request: Request, response: Response): Promise<Response> {
    const { name, email, password, admin } = request.body

    const createUserService = new CreateUserService()
    const user = await createUserService.execute({ name, email, admin, password })
    delete user.password
    return response.status(201).json(user)
  }
}

export default UsersController