import { FastifyPluginAsync } from 'fastify'

const healthcheck: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get('/status', { logLevel: 'warn' }, async function (_request, reply) {
    reply.send({ status: 'OK' })
  })
}

export default healthcheck
