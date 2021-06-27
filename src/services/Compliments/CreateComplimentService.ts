import { getCustomRepository } from 'typeorm'
import { Compliment } from '../../entities/Compliment'
import { ReceivedComplimentMail } from '../../jobs/ReceivedComplimentMail'
import { ErrorProvider } from '../../providers/ErrorProvider'
import { ComplimentsRepository } from '../../repositories/ComplimentsRepository'
import { TagsRepository } from '../../repositories/TagsRepository'
import { UsersRepository } from '../../repositories/UsersRepository'
import { I_ComplimentDTO } from './ComplimentDTO'

class CreateComplimentService {
  async execute({
    message,
    tag_id,
    user_receiver,
    user_sender
  }: I_ComplimentDTO): Promise<Compliment> {
    if (user_sender === user_receiver)
      throw new ErrorProvider('A user cannot give himself a compliment.', 400)

    const usersRepository = getCustomRepository(UsersRepository)
    const userReceiver = await usersRepository.findOne(user_receiver)
    if (!userReceiver)
      throw new ErrorProvider('User Receiver not found', 404)

    const tagsRepository = getCustomRepository(TagsRepository)
    const tag = await tagsRepository.findOne(tag_id)
    if (!tag)
      throw new ErrorProvider('Tag not found', 404)

    const complimentsRepository = getCustomRepository(ComplimentsRepository)
    const compliment = complimentsRepository.create({
      message,
      user_sender,
      user_receiver,
      tag_id
    })

    const userSender = await usersRepository.findOne(user_sender)
    await complimentsRepository.save(compliment)

    const receivedComplimentMail = new ReceivedComplimentMail()
    await receivedComplimentMail.handle({
      tagName: tag.name,
      complimentId: compliment.id,
      emailReceiver: userReceiver.email,
      nameReceiver: userReceiver.name,
      nameSender: userSender.name
    })

    return compliment
  }
}
export { CreateComplimentService }