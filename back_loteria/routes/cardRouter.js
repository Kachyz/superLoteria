const express = require ("express")
const cardRouter = express.Router()

// Importamos nuestro model
var CardModel = require('../models/cardModel')

cardRouter.get('/', (req, res) => {
  CardModel.find({}, (err, result) => {
    if(err != null){
      console.log('Error in GET card', err);
      res.status(500).send('Internal error')
    }
    res.json(result)
  })
})

cardRouter.post('/', (req, res) => {
  let tmpCard = req.body
  let newCard = new CardModel(tmpCard)
  newCard.save()
  res.status(201).send(newCard)
})

cardRouter.get('/:cardId', (req, res) => {
  let cardId = req.params.cardId
  CardModel.findById(cardId, (err, result) => {
    if (err != null) {
      res.status(404).send(`Carta con el ID ${cardId} no existe :(`)
    }
    res.json(result)
  })
})

cardRouter.put('/:cardId', (req, res) => {
  let cardId = req.params.cardId
  CardModel.findById(cardId, (err, result) => {
    if (err != null) {
      res.status(404).send(`Carta con el ID ${cardId} no existe :(`)
    }
    result.name = req.body.name
    result.image = req.body.image
    result.save()
    res.status(201).send(result)
  })
})

cardRouter.delete('/:cardId', (req, res) => {
  let cardId = req.params.cardId
  CardModel.findById(cardId, (err, result) => {
    if (err != null || result == null) {
      res.status(404).send(`Carta con el ID ${cardId} no existe :(`)
    } else {
      result.remove( err => {
        if (err)
          res.status(500).send(err)
        else
          res.status(200).send(`Carta con ID ${cardId} eliminado`)
      })
    }
  })
})

module.exports=cardRouter