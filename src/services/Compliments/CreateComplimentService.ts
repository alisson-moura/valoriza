import { getCustomRepository } from 'typeorm'
import { Compliment } from '../../entities/Compliment'
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

    await complimentsRepository.save(compliment)
    return compliment
  }
}
export { CreateComplimentService }