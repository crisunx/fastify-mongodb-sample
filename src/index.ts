import { appConfig } from './config/app'
import { startContainer } from './config/di'
import server from './config/fastify'

const start = async () => {
  try {
    const env = appConfig()

    server.log.info('Starting server...')

    startContainer(env)

    if (env.development) {
      await server.listen(env.PORT)
    } else {
      await server.listen(env.PORT, "0.0.0.0")
    }

  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
