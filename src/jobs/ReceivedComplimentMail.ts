import MailProvider from "../providers/MailProvider"

interface I_Request {
  nameSender: string
  nameReceiver: string
  emailReceiver: string
  tagName: string
  complimentId: string
}
class ReceivedComplimentMail {

  async handle({ complimentId, emailReceiver, nameReceiver, nameSender, tagName }: I_Request) {
    let context = {
      complimentId,
      nameSender,
      nameReceiver,
      tagName,
    }
    await MailProvider.send(emailReceiver, 'Parabéns, você recebeu um elogio!', 'ReceivedCompliment', context)
  }
}

export { ReceivedComplimentMail }