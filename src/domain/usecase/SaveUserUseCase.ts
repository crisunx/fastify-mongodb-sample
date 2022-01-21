import { UserRepository } from '../../infrastructure/repository/user.repository'
import { UserDataType } from '../type/user.type'


export class SaveUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async process(user: UserDataType): Promise<UserDataType> {
    const usr = this.userRepository.save(user)

    return usr
  }
}
