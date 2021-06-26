import { getCustomRepository, Like } from 'typeorm'
import { UsersRepository } from '../../repositories/UsersRepository'
import { User } from '../../entities/User'
import { ErrorProvider } from '../../providers/ErrorProvider'

class ShowDetailsUserService {
  async execute(id: string): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository)
    let user = await usersRepository.findOne(id)

    if (!user)
      throw new ErrorProvider('User not found', 404)

    delete user.password
    return user
  }
}
export { ShowDetailsUserService }