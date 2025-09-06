import mongoose from 'mongoose'
import { mongooseUserSchema } from '../../schemas/mongoose/user.js'
import { connectDB } from './mongoose.js'

export class UserModel {
  constructor (_id, name, mail, password, userID) {
    this._id = _id
    this.name = name
    this.mail = mail
    this.password = password
    this.userID = userID
  }

  async addUser () {
    try {
      connectDB()

      const MongooseUserModel = mongoose.model('UserModel', mongooseUserSchema)

      const newUser = new MongooseUserModel({
        _id: this._id,
        name: this.name,
        mail: this.mail,
        password: this.password,
        userID: this.userID
      })

      await newUser.save()
    } catch (error) {
      throw new Error('Error al registrar el usuario')
    }
  }
}
