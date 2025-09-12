import io from 'socket.io'
const socket = io('http://localhost:3000')

// Escuchar mensajes del servidor
socket.emit('connection', {})

socket.emit('open chat service', { asd: 'asd' })
