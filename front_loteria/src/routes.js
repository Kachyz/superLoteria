import React from 'react'
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
//Agregamos el alias Router para BrowserRouter (como usando const)

import App from "./App"
import Card from "./components/Card"
import Dealer from "./components/Dealer"
import Player from "./components/Player"

// Esto es un componente funcional (no tiene class)
export default () => {
  return(
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Player} ></Route> 
          <Route exact path="/dealer" component={Dealer} ></Route>
        </Switch>
      </Router>
    </div>
  )
}
