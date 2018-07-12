var mongoose = require('mongoose')
const Schema = mongoose.Schema

const cardModel = new Schema({
  "name": {type: String},
  "image": {type: String}
})

module.exports = mongoose.model("cards", cardModel)