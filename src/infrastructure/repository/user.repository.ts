import { Model } from 'mongoose'
import { User } from '../../domain/model/user.model'
import { UserDataType } from '../../domain/type/user.type'

export class UserRepository {
  constructor(private readonly userCollection: Promise<Model<User>>) {}

  async findAll(): Promise<Array<User>> {
    return (await this.userCollection).find({})
  }

  async findOne(email: string): Promise<User | null> {
    return (await this.userCollection).findOne({ email: email }, { __v: 0 })
  }

  async save(user: UserDataType): Promise<User> {
    return (await this.userCollection).create(user)
  }
}
