import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { Component } from 'react';

import Clientes from './components/Clientes'
import Proveedores from './components/Proveedores';

class Routes extends Component {
  
  render() {
    return (
      <Switch>
        <Route exact path='/clientes' component={Clientes} />
        <Route exact path='/proveedores' component={Proveedores} />
      </Switch>
    )
  }
}

export default Routes