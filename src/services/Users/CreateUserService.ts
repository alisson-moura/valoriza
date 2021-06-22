import { getCustomRepository } from 'typeorm'
import { AppError } from '../../AppError'
import { UsersRepository } from '../../repositories/UsersRepository'
import { I_UserDTO } from './UserDTO'

class CreateUserService {
  async execute({ email, name, password, admin }: I_UserDTO) {
    const usersRepository = getCustomRepository(UsersRepository)

    const userAlreadyExists = await usersRepository.findOne({ email })
    if (userAlreadyExists) {
      throw new AppError("User already exists", 409)
    }

    const user = usersRepository.create({
      name,
      password,
      email,
      admin: admin == undefined ? false : admin
    })
    await usersRepository.save(user)
    return user
  }
}
export { CreateUserService }