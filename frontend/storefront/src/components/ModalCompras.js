import React, { Component } from 'react'
import { Modal, Form, Header, Button } from "semantic-ui-react";
import Axios from 'axios';
import ErrorMsg from './ErrorMsg'
import CmbAutocomplete from './CmbAutocomplete';

class ModalCompras extends Component {
  constructor(props) {
    super(props);
    this.getCodProvider = this.getCodProvider.bind(this)
    this.getCodProduct = this.getCodProduct.bind(this)
    this.state = {
      postHandler: false,
      providercode: [],
      productcode: [],
      productos: [],
      selected: [],
      total:0,
      cantidad: 1
    }
  }

  createCompra = event => {
    event.preventDefault()
    const data = {
      id: this.state.id, name: this.state.name, address: this.state.address,
      email: this.state.email, phone: this.state.phone
    }
    if (this.state.edit) {
      Axios.put(this.props.url, { data })
        .then(res => {
          this.closeModal()
          this.props.upDate()
        }).catch(res => {
          this.setState({ postHandler: true })
        }
        )
    }
    else {
      Axios.post(this.props.url, { data })
        .then(res => {
          this.closeModal()
          this.props.upDate()
        }).catch(res => {
          this.setState({ postHandler: true })
        }
        )
    }
  }

  getCantidad = event => {
    this.setState({ cantidad: event.target.value })
  }

  getCodProvider(code) {
    this.setState({ providercode: code })
  }

  getCodProduct(code) {
    this.setState({ productcode: code })
  }

  closeModal = () => {
    this.props.onClose()
  }

  agregar = () => {
    const selected = this.state.selected
    var product = Object.assign(this.state.productcode, { 'quantity': this.state.cantidad })
    var total = parseInt(this.state.total) + parseInt(product.quantity) * parseInt(product.price);
    this.setState({total:total})  
    selected.push(product)
    this.setState({ selected })
  }

  render() {
    return (
      <div>
        <Modal as={Form} onSubmit={this.createClient} open={true} size="tiny">
          <Header icon="pencil" content="Agregar Compra" as="h3" />
          <Modal.Content>

            <CmbAutocomplete
              source="http://localhost:5000/proveedoreslist"
              getcode={this.getCodProvider}
              closeMsg={this.closeMsgError}
              label={"Proveedor"}
              holder={"Select Provider"}
            />

            <CmbAutocomplete
              source="http://localhost:5000/productoslist"
              getcode={this.getCodProduct}
              closeMsg={this.closeMsgError}
              label={"Producto"}
              holder={"Select Product"}
            />
            <Form.Input label="cantidad" required type="number" placeholder="cantidad" onChange={this.getCantidad} value={this.state.cantidad} />
            <div class="ui small basic icon buttons">
              <button class="ui button" onClick={this.agregar}><i class="plus square icon"></i></button>
            </div>

            <table class="ui celled table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                 </tr>
              </thead>
              <tbody>
                {this.state.selected.map(productos => {
                  return (
                    <tr>
                      <td>{productos.id}</td>
                      <td>{productos.description}</td>
                      <td>{productos.quantity}</td>
                      <td>{productos.price}</td>
                      <td> {productos.price * productos.quantity}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
              <p><strong>Total: {this.state.total}</strong></p>
            {this.state.postHandler && <ErrorMsg title="Error al crear cliente" description="Verifique que el id no esté creado" />}
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" icon="times" content="Close" onClick={this.closeModal} />
            <Button type="submit" color="green" icon="save" content="Save" />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default ModalCompras