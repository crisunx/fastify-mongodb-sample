import { FastifyServerOptions } from 'fastify'
import { PrettyOptions } from 'fastify/types/logger'
import { LoggerOptions } from 'pino'
import { appConfig } from './app'
import { nanoid } from 'nanoid'

const config = appConfig()

const xRequestId = 'x-request-id'

export type LoggerConf = { prettyPrint?: { singleLine: boolean } & PrettyOptions } & PrettyOptions & LoggerOptions

export type CustomServerOptions = { logger: LoggerConf } & Partial<FastifyServerOptions>

const formatter = {
  level(level: string) {
    return { level }
  },
}

export const serverOptions = (): CustomServerOptions => {
  const logger = config.development
    ? {
        formatters: formatter,
        prettyPrint: {
          singleLine: true,
          ignore: 'pid,hostname',
          translateTime: 'yyyy-mm-dd HH:MM:ss.l o',
        },
      }
    : {
        level: 'info',
        formatters: formatter,
      }

  return {
    genReqId: (req) => {
      const serverReqId = req.headers[xRequestId] as string | undefined
      if (serverReqId) return serverReqId
      return nanoid()
    },
    logger,
  }
}
