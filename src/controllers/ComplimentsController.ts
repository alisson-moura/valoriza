import { Request, Response } from "express";
import { CreateComplimentService } from "../services/Compliments/CreateComplimentService";

class ComplimentsController {
  async store(request: Request, response: Response): Promise<Response> {
    const { user_id: user_sender } = request
    const {
      message,
      tag_id,
      user_receiver
    } = request.body

    const createComplimentService = new CreateComplimentService()
    const compliment = await createComplimentService.execute({
      message,
      tag_id,
      user_receiver,
      user_sender
    })
    return response.status(201).json(compliment)
  }
}

export default ComplimentsController