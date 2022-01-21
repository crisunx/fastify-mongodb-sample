import { Type } from '@sinclair/typebox'
import { FastifyPluginAsync, RequestGenericInterface } from 'fastify'
import { UserData, UserDataType } from '../../domain/type/user.type'

interface UserRequest extends RequestGenericInterface {
  Querystring: {
    email: string
  }
}

const user: FastifyPluginAsync = async (fastify): Promise<void> => {
  const listUsersUseCase = fastify.diContainer.cradle.listUsersUseCase
  const saveUsersUseCase = fastify.diContainer.cradle.saveUsersUseCase
  const findUserUseCase = fastify.diContainer.cradle.findUserUseCase

  fastify.get('/user', async function (_request, reply) {
    reply.send(await listUsersUseCase.process())
  })

  fastify.get<UserRequest>(
    '/user/:email',
    {
      schema: {
        querystring: Type.Object({ email: Type.String({ format: 'email' }) }),
      },
    },
    async function (request, reply) {
      const { email } = request.query
      reply.send(await findUserUseCase.process(email))
    }
  )

  fastify.post<{ Body: UserDataType }>(
    '/user',
    {
      schema: {
        body: UserData,
      },
    },
    async function (request, replay) {
      const { body: user } = request
      replay.send(await saveUsersUseCase.process(user))
    }
  )
}

export default user
