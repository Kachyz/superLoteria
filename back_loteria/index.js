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

const defaultImg = "/static/media/logo.5d5d9eef.svg"
let usedCards = []
let playing = true
const stop = "https://www.tysvirtual.com/1476-large_default/senal-alto-no-pasar-340x230-mm.jpg"
const win = "https://i1.wp.com/austenauthors.net/wp-content/uploads/2017/08/winner-gold-ribbon.png?fit=325%2C384&ssl=1#aqua_resizer_image_not_local"

app.use(bodyParser.json())

app.use(cors())

app.use('/card', cardRouter)

io.on('connection', socket => {
  console.log('Alguien se ha conectado');
  socket.emit('print-card', {name: "Iniciamos pronto", image: defaultImg})

  socket.on('new-card', card => {
    console.log('new card received -', card.name);
    usedCards.push(card.name)
    if( playing )
      io.sockets.emit('print-card', card)
  })

  socket.on('out-of-cards', card => {
    console.log('There are no more cards to draw');
    if( playing )
      io.sockets.emit('print-card', card) // message to everyone
  })

  socket.on('reset', card => {
    console.log('Reset game!!');
    playing = true
    usedCards = []
    io.sockets.emit('print-card', card)
  })

  socket.on('bingo', cards => {
    if( playing ){
      // if wins
      if ( cards.every( card => usedCards.indexOf(card) > -1) ){
        playing = false
        io.sockets.emit('print-card', {name: "Hay un ganador!!", image: stop})
        socket.emit('print-card', {name: "Felicidades!", image: win})
      } else {
        socket.emit('print-card', {name: "Lo siento, fallaste", image: stop})
      }
    }
  })

  socket.on('disconnect', () => {
    console.log('Alguien se ha ido');
  })

})

server.listen(8000, () => {
  console.log(`Estamos corriendo en el puerto 8000`);
})