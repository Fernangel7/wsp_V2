import { partialUserValidation } from '../schemas/user.js'
import crypto from 'crypto'

export class userController {
  constructor ({ UserModel }) {
    this.UserModel = UserModel
  }

  static async addUser (data) {
    if (!await partialUserValidation(data)) throw new Error('Invalid Data!')
    const _id = crypto.randomUUID()
    const name = data.name
    const mail = data.mail
    const password = data.password
    const userID = Math.floor(Math.random() * (99999999 - 10000000) + 10000000)

    if (await this.UserModel.addUser(_id, name, mail, password, userID)) return 'Usuario registrado exitosamente'
    return 'Error al registrar al usuario'
  }
}
