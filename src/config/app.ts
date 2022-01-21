import { Static, Type } from '@sinclair/typebox'
import * as dotenv from 'dotenv'
import envSchema from 'env-schema'

const schema = Type.Strict(
  Type.Object({
    PORT: Type.Number({ default: 3000 }),
    DB_URL: Type.String(),
    development: Type.Boolean({ default: false }),
  })
)

export type Env = Static<typeof schema>

export const appConfig = (): Env => {
  dotenv.config()
  return envSchema<Env>({
    schema: schema,
  })
}
