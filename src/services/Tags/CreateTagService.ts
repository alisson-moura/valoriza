import { getCustomRepository } from 'typeorm'
import { AppError } from '../../AppError'
import { TagsRepository } from '../../repositories/TagsRepository'
import { I_TagDTO } from './TagDTO'

class CreateTagService {
  async execute({ name, description }: I_TagDTO) {
    const tagsRepository = getCustomRepository(TagsRepository)

    const tagAlreadyExists = await tagsRepository.findOne({ name })
    if (tagAlreadyExists) {
      throw new AppError("Tag already exists", 409)
    }

    const tag = tagsRepository.create({
      name,
      description
    })
    await tagsRepository.save(tag)
    return tag
  }
}
export { CreateTagService }