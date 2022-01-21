import { Document, model, Schema } from 'mongoose'

export interface User extends Document {
  name: string
  email: string
  age: number
  createdAt?: Date
}

export const UserSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  createdAt: { type: Date, required: false },
})

export const UserModel = model<User>('User', UserSchema)
