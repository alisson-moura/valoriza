import { Request, Response } from "express";
import { CreateTagService } from "../services/Tags/CreateTagService";

class TagsController {
  async store(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body

    if (!name) {
      return response.status(400).json({ error: 'Name invalid.' })
    }

    const createTagService = new CreateTagService()
    const tag = await createTagService.execute({ name, description })
    return response.status(201).json(tag)
  }
}

export default TagsController