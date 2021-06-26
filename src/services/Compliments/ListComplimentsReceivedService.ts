import { getCustomRepository } from "typeorm";
import { Compliment } from "../../entities/Compliment";
import { ErrorProvider } from "../../providers/ErrorProvider";
import { ComplimentsRepository } from "../../repositories/ComplimentsRepository";

class ListComplimentsReceived {
  async execute(user_receiver: string): Promise<Compliment[]> {
    const complimentsRepository = getCustomRepository(ComplimentsRepository)
    let compliments = await complimentsRepository.find({
      where: {
        user_receiver
      },
      relations: ['userSender', 'userReceiver', 'tag']
    })

    if (!compliments) {
      throw new ErrorProvider('Invalid user', 400)
    }

    compliments = compliments.map(compliment => {
      delete compliment.userSender.password
      delete compliment.userReceiver.password
      return compliment
    })

    return compliments
  }
}

export { ListComplimentsReceived }