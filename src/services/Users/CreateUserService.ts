import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../../repositories/UsersRepository'
import { I_User } from './UserDTO'

class CreateUserService {
  async execute({ email, name, password, admin }: I_User) {
    const usersRepository = getCustomRepository(UsersRepository)

    const userAlreadyExists = await usersRepository.findOne({ email })
    if (userAlreadyExists) {
      throw new Error("User already exists")
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