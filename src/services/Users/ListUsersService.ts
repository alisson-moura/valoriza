import { getCustomRepository, Like } from 'typeorm'
import { UsersRepository } from '../../repositories/UsersRepository'
import { User } from '../../entities/User'

class ListUsersService {
  async execute(name?: string): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository)
    let users = name
      ? await usersRepository.find({
        where: {
          name: Like(`%${name}%`)
        },
        order: {
          name: 'ASC'
        }
      })
      : await usersRepository.find({
        order: {
          name: 'ASC'
        }
      })

    users = users.map(user => {
      delete user.password
      return user
    })

    return users
  }
}
export { ListUsersService }