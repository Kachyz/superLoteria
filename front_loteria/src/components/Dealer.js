import React from 'react'
import axios from 'axios'
import socketIOClient from 'socket.io-client'

import logo from '../logo.svg';
import Card from './Card'
import Button from '@material-ui/core/Button';


class Dealer extends React.Component{

  state = {
    cartas: []
  }

  usedCards = []
  nextBtnDisable = false

  componentDidMount(){
    this.socket = socketIOClient('http://localhost:8000/')
    
    this.socket.on('print-card', card => {
      console.log('El server dijo:', card.name)
      this.setState({current: card})
    })
  }

  componentWillMount(){
    // Hacemos la peticion al backend
    axios.get("http://localhost:8000/card/")
      .then( resp => {
        console.log('La respuesta del server:', resp)
        this.setState({cartas: resp.data})
      })
      .catch( err => {
        console.log('ERROR -', err)
      })
  }

  drawCard = () => {
    const cartas = this.state.cartas
    let lookingForCard = true
    let newCard

    while(lookingForCard){
      if(this.usedCards.length === cartas.length){
        console.log('All cards were drawn'); 
        newCard = {name: "No more cards", image: logo} // placeholder
        lookingForCard = false
        this.nextBtnDisable = true;
        this.socket.emit('out-of-cards', newCard)
        break
      }

      newCard = cartas[Math.floor(Math.random()*cartas.length)]

      if ( this.usedCards.indexOf(newCard.name) === -1 ){
        console.log('salio', newCard.name);
        this.usedCards.push(newCard.name)
        lookingForCard = false
        this.socket.emit('new-card', newCard)
      } else {
        console.log(newCard.name, 'ya existe');
      }
    }

  }

  resetGame = () => {
    console.log('Reset game requested');
    this.usedCards = []
    this.nextBtnDisable = false

    const reset = {name: "Game restarted", image: logo}
    this.socket.emit('reset', reset)
  }

  render(){

    let carta = this.state.current
    let myCard

    if(carta === undefined){
      myCard = <Card /> 
    } else{
      myCard = <Card
        key = {carta._id}
        name = {carta.name}
        image = {carta.image}
      />
    }

    return (
      <div className="Dealer">
        {myCard}
        <Button variant="contained" color="primary" onClick={()=>this.drawCard()} disabled={this.nextBtnDisable}>
          NEXT
        </Button>
        <Button variant="contained" color="secondary" onClick={()=>this.resetGame()}>
          RESTART
        </Button>
      </div>
    );

  }

}

export default Dealer