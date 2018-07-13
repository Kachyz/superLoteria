const express = require('express')
const cardRouter = require('./routes/cardRouter')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const socketIO = require('socket.io')
const http = require('http')


const app = express()
const server = http.createServer(app)
const io = socketIO(server)
const db = mongoose.connect('mongodb://admin:123qwe@ds133621.mlab.com:33621/superloteria-api')

app.use(bodyParser.json())

app.use(cors())

app.use('/card', cardRouter)

io.on('connection', socket => {
  console.log('Alguien se ha conectado');
  socket.emit('print-card', {name: "Iniciamos pronto", image: "/static/media/logo.5d5d9eef.svg"})

  socket.on('new-card', card => {
    console.log('new card received -', card.name);
    io.sockets.emit('print-card', card)
  })

  socket.on('out-of-cards', card => {
    console.log('There are no more cards to draw');
    io.sockets.emit('print-card', card) // message to everyone
  })

  socket.on('reset', card => {
    console.log('Reset game!!');
    io.sockets.emit('print-card', card)
  })

  socket.on('disconnect', () => {
    console.log('Alguien se ha ido');
  })

})

server.listen(8000, () => {
  console.log(`Estamos corriendo en el puerto 8000`);
})