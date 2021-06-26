import { Request, Response } from "express";
import { Compliment } from "../entities/Compliment";
import { ErrorProvider } from "../providers/ErrorProvider";
import { CreateComplimentService } from "../services/Compliments/CreateComplimentService";
import { ListComplimentsReceived } from "../services/Compliments/ListComplimentsReceivedService";
import { ListComplimentsSent } from "../services/Compliments/ListComplimentsSentService";

class ComplimentsController {
  async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { type = 'sent' } = request.query
    let compliments: Compliment[]

    switch (type) {
      case 'sent':
        const listComplimentsSent = new ListComplimentsSent()
        compliments = await listComplimentsSent.execute(id)
        break
      case 'received':
        const listComplimentsReceived = new ListComplimentsReceived()
        compliments = await listComplimentsReceived.execute(id)
        break
      default:
        throw new ErrorProvider('Type is invalid', 400)
    }

    return response.status(200).json(compliments)
  }

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