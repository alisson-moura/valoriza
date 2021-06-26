import { getCustomRepository, Like } from 'typeorm'
import { Tag } from '../../entities/Tag'
import { TagsRepository } from '../../repositories/TagsRepository'

class ListTagsService {
  async execute(name?: string): Promise<Tag[]> {
    const tagsRepository = getCustomRepository(TagsRepository)
    let tags = name
      ? await tagsRepository.find({
        where: {
          name: Like(`%${name}%`)
        },
        order: {
          name: 'ASC'
        }
      })
      : await tagsRepository.find({
        order: {
          name: 'ASC'
        }
      })

    return tags
  }
}
export { ListTagsService }