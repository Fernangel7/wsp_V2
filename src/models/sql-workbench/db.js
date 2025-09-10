import mysql from 'mysql2/promise';

export const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sql_workbench'
})

connection.connect(error => {
  if (error) throw new Error('Database connection failed!')
})
