import { asClass, asValue, AwilixContainer } from 'awilix'
import { Cradle, diContainer } from 'fastify-awilix/lib/classic'
import mongoose from 'mongoose'
import { User, UserModel } from '../domain/model/user.entity'
import { FindUserUseCase } from '../domain/usecase/FindUserUseCase'
import { ListUsersUseCase } from '../domain/usecase/ListUsersUseCase'
import { SaveUserUseCase } from '../domain/usecase/SaveUserUseCase'
import { UserRepository } from '../infrastructure/repository/user.repository'
import { Env } from './app'

export type DiConfig = (env: Env, di: AwilixContainer<Cradle>) => void

declare module 'fastify-awilix' {
  interface Cradle {
    config: Env
    connection: mongoose.Connection
    userRepository: UserRepository
    findUserUseCase: FindUserUseCase
    saveUsersUseCase: SaveUserUseCase
    listUsersUseCase: ListUsersUseCase
    userCollection: Promise<mongoose.Model<User>>
  }
}

const defaultConfig: DiConfig = (env, di) => {
  const connection = mongoose.createConnection(env.DB_URL)
  di.register({
    config: asValue(env),
    connection: asValue(connection),
    userRepository: asClass(UserRepository).singleton(),
    findUserUseCase: asClass(FindUserUseCase).singleton(),
    saveUsersUseCase: asClass(SaveUserUseCase).singleton(),
    listUsersUseCase: asClass(ListUsersUseCase).singleton(),
    userCollection: asValue(getMongoCollection(connection, 'users', UserModel)),
  })
}

async function getMongoCollection<T>(
  connection: mongoose.Connection,
  collName: string,
  model: mongoose.Model<T>
): Promise<mongoose.Model<T>> {
  return connection.model(collName, model.schema)
}

export const startContainer = (env: Env): void => {
  defaultConfig(env, diContainer)
}
