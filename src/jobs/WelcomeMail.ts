import MailProvider from "../providers/MailProvider"

class WelcomeMail {

  async handle(name: string, email: string) {
    let context = {
      name
    }
    await MailProvider.send(email, 'Bem vindo ao Valoriza', 'Welcome', context)
  }
}

export { WelcomeMail }