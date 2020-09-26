import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext';


class WorkMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '', 
      col:''
    }
  }

 /* componentDidMount() {
    const credentials = JSON.parse(sessionStorage.getItem('loginState'))
    if (credentials != null) {
      try {
        this.setState({ col: credentials.colegio[0].NOMBRE })
        this.setState({ user: credentials.colegio[0].DATOS_RECTOR.APELLIDO1 
                       + ' ' +credentials.colegio[0].DATOS_RECTOR.APELLIDO2
                       + ' ' +credentials.colegio[0].DATOS_RECTOR.NOMBRE1})
      }
      catch{ }
    }
  }
*/

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu>

        <Menu.Item as={Link} to='/clientes'
          name='clientes'
          active={activeItem === 'clientes'}
          onClick={this.handleItemClick}
        >
          Clientes
        </Menu.Item>

        <Menu.Item as={Link} to='/proveedores'
          name='proveedores'
          active={activeItem === 'proveedores'}
          onClick={this.handleItemClick}
        >
          Proveedores
        </Menu.Item>

        <Menu.Item as={Link} to='/productos'
          name='Productos'
          active={activeItem === 'Productos'}
          onClick={this.handleItemClick}
        >
          Productos
        </Menu.Item>

        <Menu.Item as={Link} to='/Compras'
          name='compras'
          active={activeItem === 'compras'}
          onClick={this.handleItemClick}
        >
          Compras
        </Menu.Item>

        <div class="ui small basic icon buttons">
            <UserContext.Consumer>
              {({ logout }) => {
                return (<button class="ui button active" onClick={logout}> Logout  <i class="sign-out alternate icon"></i></button>)
              }}
            </UserContext.Consumer>
        </div>
      </Menu>
    )
  }
}

export default WorkMenu