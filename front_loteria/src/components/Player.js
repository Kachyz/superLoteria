import React from 'react'
import axios from 'axios'

import Card from './Card'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


class Dealer extends React.Component{

  state = {
    cartas: []
  }

  numberOfCards = 4
  myCards = []

  componentWillMount(){
    // Hacemos la peticion al backend
    axios.get("http://localhost:8000/card/")
      .then( resp => {
        console.log('La respuesta del server:', resp)
        this.setState({cartas: resp.data})
        this.getPlayerCards()
      })
      .catch( err => {
        console.log('ERROR -', err)
      })
  }

  getPlayerCards = () => {
    // Generate a group of N different cards (numberOfCards)
    let newCard
    let usedCards = []

    while( this.myCards.length < this.numberOfCards ){
      newCard = this.state.cartas[Math.floor(Math.random()*this.state.cartas.length)]

      if ( usedCards.indexOf(newCard.name) === -1 ){
        console.log('salio', newCard.name);
        this.myCards.push(newCard)
        usedCards.push(newCard.name)
      } else {
        console.log(newCard.name, 'ya existe');
      }
    }
    console.log('cartas', this.myCards)
    this.setState({state: 'cards were selected'})
  }

  render(){
    return (
      <div className="Player">
        <Grid container spacing={24}>
        { 
          this.myCards.map(carta =>{
            return <Grid item sm key = {carta._id}>
                    <Card
                      key = {carta._id}
                      id = {carta._id}
                      name = {carta.name}
                      image = {carta.image}
                      history = {this.props.history} //quiza no es necesario
                    />
                    </Grid>
          })
        }
        </Grid>        

        <Button variant="contained" color="primary" >
        {/* TODO: next attrs in this button  onClick={()=>this.drawCard()} disabled={this.nextBtnDisable}> */}
          Loteria!!
        </Button>
      </div>
    );
  }

}

export default Dealer