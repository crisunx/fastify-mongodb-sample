import { UserRepository } from '../../infrastructure/repository/user.repository'
import { User } from '../model/user.model'

export class ListUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async process(): Promise<Array<User>> {
    return this.userRepository.findAll()
  }
}
