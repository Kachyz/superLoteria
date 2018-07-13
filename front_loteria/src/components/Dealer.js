import React from 'react'
import axios from 'axios'

import logo from '../logo.svg';
import Card from './Card'
import Button from '@material-ui/core/Button';


class Dealer extends React.Component{

  state = {
    cartas: []
  }

  usedCards = []
  nextBtnDisable = false

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
        console.log('All cards were drawn'); // TODO: Add a placeholder image to show when there are no more cards
        newCard = {name: "No more cards", image: logo}
        lookingForCard = false
        this.nextBtnDisable = true;
        break
      }

      newCard = cartas[Math.floor(Math.random()*cartas.length)]

      if ( this.usedCards.indexOf(newCard.name) === -1 ){
        console.log('salio', newCard.name);
        this.usedCards.push(newCard.name)
        lookingForCard = false
      } else {
        console.log(newCard.name, 'ya existe');
      }
    }

    this.setState({current: newCard})
  }

  resetGame = () => {
    console.log('Reset game requested');
    this.usedCards = []
    this.nextBtnDisable = false

    const reset = {name: "Game restarted", image: logo}
    this.setState({current: reset})
  }

  render(){

    // const cartas = this.state.cartas
    // let carta = cartas[Math.floor(Math.random()*cartas.length)]
    let carta = this.state.current
    let myCard

    if(carta === undefined){
      myCard = <Card /> 
    } else{
      myCard = <Card
        key = {carta._id}
        id = {carta._id}
        name = {carta.name}
        image = {carta.image}
        history = {this.props.history} //quiza no es necesario
      />
    }

    return (
      <div className="App">
        {myCard}
        <Button variant="contained" color="primary" onClick={()=>this.drawCard()} disabled={this.nextBtnDisable}>
          NEXT
        </Button>
        {/* TODO: RESET functionality */}
        <Button variant="contained" color="secondary" onClick={()=>this.resetGame()}>
          RESTART
        </Button>
      </div>
    );

  }

}

export default Dealer