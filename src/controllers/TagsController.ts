import { Request, Response } from "express";
import { CreateTagService } from "../services/Tags/CreateTagService";
import { ListTagsService } from "../services/Tags/ListTagsService";

class TagsController {
  async index(request: Request, response: Response): Promise<Response> {
    const name = request.query.name as string
    const listTags = new ListTagsService()
    const tags = await listTags.execute(name)
    return response.json(tags)
  }

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