import mongoose from 'mongoose'

export const mongooseUserSchema = mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  mail: { type: String, required: true },
  password: { type: String, required: true },
  userID: { type: Number, required: true }
})
