import { getCustomRepository } from 'typeorm'
import { ErrorProvider } from '../../providers/ErrorProvider'
import { EncryptionProvider } from '../../providers/EncryptionProvider'
import { UsersRepository } from '../../repositories/UsersRepository'
import { I_UserDTO } from './UserDTO'

class CreateUserService {
  async execute({ email, name, password, admin }: I_UserDTO) {
    const usersRepository = getCustomRepository(UsersRepository)

    const userAlreadyExists = await usersRepository.findOne({ email })
    if (userAlreadyExists) {
      throw new ErrorProvider("User already exists", 409)
    }

    const encryptionProvider = new EncryptionProvider()
    const passwordEncrypted = await encryptionProvider.encrypt(password)

    const user = usersRepository.create({
      name,
      password: passwordEncrypted,
      email,
      admin: admin == undefined ? false : admin
    })
    await usersRepository.save(user)

    return user
  }
}
export { CreateUserService }