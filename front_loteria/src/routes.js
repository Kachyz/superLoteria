import React from 'react'
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
//Agregamos el alias Router para BrowserRouter (como usando const)

import App from "./App"
import Card from "./components/Card"

// Esto es un componente funcional (no tiene class)
export default () => {
  return(
    <div>
      <Router>
        <Switch>
          {/* TODO: should be /card */}
          <Route exact path="/" component={App} ></Route> 
          {/* TODO: Delete next line */}
          <Route exact path="/card/" component={Card} ></Route> 
          {/* TODO: Usar componente Dealer, quiza cambiar ruta */}
          <Route exact path="/dealer" component={Card} ></Route>
        </Switch>
      </Router>
    </div>
  )
}
