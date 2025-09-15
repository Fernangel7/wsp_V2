import { pool } from './db.js'

export class userModel {
  static async addUser (_id, name, mail, password, userID) {
    try {
      const [rows] = await pool.query('INSERT INTO users (_id, name, mail, password, userID) VALUES (?, ?, ?, ?, ?)', [_id, name, mail, password, userID])
      return rows
    } catch (error) {
      throw new Error('Error al registrar el usuario')
    }
  }
}
