import { getCustomRepository } from 'typeorm'
import { Tag } from '../../entities/Tag'
import { ErrorProvider } from '../../providers/ErrorProvider'
import { TagsRepository } from '../../repositories/TagsRepository'
import { I_TagDTO } from './TagDTO'

class CreateTagService {
  async execute({ name, description }: I_TagDTO): Promise<Tag> {
    const tagsRepository = getCustomRepository(TagsRepository)

    const tagAlreadyExists = await tagsRepository.findOne({ name })
    if (tagAlreadyExists) {
      throw new ErrorProvider("Tag already exists", 409)
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