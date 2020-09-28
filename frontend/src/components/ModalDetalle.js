import React, { Component } from 'react'
import { Modal, Form, Header, Button } from "semantic-ui-react";
import Axios from 'axios';

class ModalDetalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proveedor: [],
      productos: [],      
      bill:[],
      postHandler: false,
    }
  }

  componentDidMount() {
    try {
      const tokens = JSON.parse(sessionStorage.getItem('loginState'))
      Axios.get('http://localhost:5000/detalle/' + this.props.id, {
        headers: { authorization: tokens.access_token }
      })
        .then(result => {
          var productos = result.data;          
          this.setState({ proveedor: productos[0].bill.provider })
          this.setState({ bill: productos[0].bill })
          this.setState({ productos: productos })
          
        }).catch(res => {
          console.log('sin respuesta')
        })
    }
    catch (error) {
      console.error(error)
    }
  }

  closeModal = () => {
    this.props.onClose()
  }

  render() {
    return (
      <div>
        <Modal as={Form} onSubmit={this.createClient} open={true} size="mini">
          <Header icon="pencil" content="Detalle" as="h3" />
          <Modal.Content>           
            <p>Proveedor:{this.state.proveedor.name}<br>
            </br> Email: {this.state.proveedor.email}<br>
            </br> Phone: {this.state.proveedor.phone}              
            </p>
            <table class="ui celled table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Description</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {this.state.productos.map(productos => {
                  return (
                    <tr>
                      <td>{productos.products.id}</td>
                      <td>{productos.products.description}</td>
                      <td>{productos.products.price}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div>
               <p><strong>Total: ${this.state.bill.value}</strong></p>
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" icon="times" content="Close" onClick={this.closeModal} />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default ModalDetalle