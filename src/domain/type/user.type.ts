import { Static, Type } from 'fastify-typebox'

export const UserData = Type.Object({
  name: Type.String(),
  email: Type.String({ format: 'email' }),
  age: Type.Number(),
})

export type UserDataType = Static<typeof UserData>
