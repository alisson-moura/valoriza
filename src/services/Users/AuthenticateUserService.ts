import { getCustomRepository } from "typeorm"
import { EncryptionProvider } from "../../providers/EncryptionProvider"
import { ErrorProvider } from "../../providers/ErrorProvider"
import { TokenProvider } from "../../providers/TokenProvider"
import { UsersRepository } from "../../repositories/UsersRepository"

class AuthenticateUserService {
  async execute(email: string, password: string): Promise<string> {
    const usersRepository = getCustomRepository(UsersRepository)
    const user = await usersRepository.findOne({ email })
    if (!user)
      throw new ErrorProvider("E-mail or password incorrect.", 400)

    const encryptionProvider = new EncryptionProvider()
    const passwordMatch = await encryptionProvider.compare(password, user.password)
    if (!passwordMatch)
      throw new ErrorProvider("E-mail or password incorrect.", 400)

    const tokenProvider = new TokenProvider()
    const token = tokenProvider.create(user.id, user.email)

    return token
  }
}

export { AuthenticateUserService }