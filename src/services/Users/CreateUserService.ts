import { getCustomRepository } from 'typeorm'
import { ErrorProvider } from '../../providers/ErrorProvider'
import { EncryptionProvider } from '../../providers/EncryptionProvider'
import { UsersRepository } from '../../repositories/UsersRepository'
import { I_UserDTO } from './UserDTO'
import { WelcomeMail } from '../../jobs/WelcomeMail'


class CreateUserService {
  async execute({ email, name, password, admin = false }: I_UserDTO) {
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
      admin
    })
    await usersRepository.save(user)

    const welcomeMail = new WelcomeMail()
    await welcomeMail.handle(user.name, user.email)

    return user
  }
}
export { CreateUserService }