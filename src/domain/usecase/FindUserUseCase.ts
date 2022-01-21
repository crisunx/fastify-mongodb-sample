import { UserRepository } from '../../infrastructure/repository/user.repository'
import { User } from '../model/user.model'

export class FindUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async process(email: string): Promise<User | null> {
    return this.userRepository.findOne(email)
  }
}
