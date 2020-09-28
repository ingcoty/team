import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { Component } from 'react';

import Clientes from './components/Clientes'
import Proveedores from './components/Proveedores';
import Productos from './components/Productos';
import Compras from './components/Compras';
import Detalle from './components/Compras';

class Routes extends Component {
  
  render() {
    return (
      <Switch>
        <Route exact path='/clientes' component={Clientes} />
        <Route exact path='/proveedores' component={Proveedores} />
        <Route exact path='/productos' component={Productos} />
        <Route exact path='/compras' component={Compras} />
        <Route exact path='/detalle/id' component={Detalle} />
      </Switch>
    )
  }modalfeed
}

export default Routes