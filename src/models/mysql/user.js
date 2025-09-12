import { connection } from './db.js'

export class userModel {
  static async addUser (_id, name, mail, password, userID) {
    try {
      connection()
      return true
    } catch (error) {
      throw new Error('Error al registrar el usuario')
    }
  }
}
