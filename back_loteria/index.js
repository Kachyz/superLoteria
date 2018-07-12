const express = require('express')
const cardRouter = require('./routes/cardRouter')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const db = mongoose.connect('mongodb://admin:123qwe@ds133621.mlab.com:33621/superloteria-api')

app.use(bodyParser.json())

app.use(cors())

app.use('/card', cardRouter)

app.listen(8000, () => {
  console.log(`Estamos corriendo en el puerto 8000`);
})