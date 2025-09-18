import { pool } from './db.js'

class authModel {
  static async signin (username, password) {
    try {
      const [row] = await pool.query('SELECT COUNT(*) as userFound FROM users WHERE username = ? AND password = ?', [username, password])

      if (row[0].userFound === 0) {
        return ({ response: false })
      }

      const [rows] = await pool.query('SELECT BIN_TO_UUID(userUUID), name, mail, username, password, type, loa FROM users WHERE username = ? AND password = ?', [username, password])

      if (rows.length === 0) {
        return ({ response: false })
      }

      return ({
        response: row[0].userFound > 0,
        data: {
          userUUID: rows.userUUID,
          name: rows.name,
          mail: rows.mail,
          username: [username],
          password: [password],
          type: rows.type,
          loa: rows.loa
        }
      })
    } catch (error) {
      return false
    }
  }
}

export default authModel
