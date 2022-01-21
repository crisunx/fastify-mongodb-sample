import Fastify, { FastifyInstance } from 'fastify'
import AutoLoad from 'fastify-autoload'
import { join } from 'path'
import { serverOptions } from './logger'

const server: FastifyInstance = Fastify(serverOptions())

server.register(async (fastify, opts): Promise<void> => {
  fastify.register(AutoLoad, {
    dir: join(__dirname, './plugins'),
    options: opts,
  })

  fastify.register(AutoLoad, {
    dir: join(__dirname, '../infrastructure/routes'),
    options: opts,
  })
})

export default server
