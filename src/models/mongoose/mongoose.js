import mongoose from 'mongoose'
import { MONGO_URI } from '../../config.js'

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('Conexión Exitosa a MongoDB Atlas!')
  } catch (error) {
    console.error('Error de conexión a MongoDB: ', error)
    process.exit(0)
  }
}

export const closeConexion = async () => {
  await mongoose.connection.close(() => {
    process.exit(0)
  })
}
