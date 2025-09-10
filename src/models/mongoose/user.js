import mongoose from 'mongoose'
import { mongooseUserSchema } from '../../schemas/mongoose/user.js'
import { connectDB } from './mongoose.js'

export class UserModel {
  static async addUser (_id, name, mail, password, userID) {
    try {
      connectDB()

      const MongooseUserModel = mongoose.model('UserModel', mongooseUserSchema)

      const newUser = new MongooseUserModel({
        _id: [_id],
        name: [name],
        mail: [mail],
        password: [password],
        userID: [userID]
      })

      await newUser.save()
      return true
    } catch (error) {
      throw new Error('Error al registrar el usuario')
    }
  }
}
