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
      total: 0,
      cantidad: 1
    }
  }

  createCompra = event => {
    //event.preventDefault()
    var date = new Date()
    const data = {
      "provider": this.state.providercode.id,
      "date": date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear(),
      "value": this.state.total,
      "productos": this.state.selected
    }
    const tokens = JSON.parse(sessionStorage.getItem('loginState'))
    Axios.post(this.props.url, { data }, {headers: { authorization: tokens.access_token }})
      .then(res => {
        this.closeModal()
        this.props.upDate()
      }).catch(res => {
        this.setState({ postHandler: true })
      }
      )
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
    this.setState({ total: total })
    selected.push(product)
    this.setState({ selected })
  }

  render() {
    return (
      <div>
        <Modal as={Form} open={true} size="tiny">
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
            {this.state.postHandler && <ErrorMsg title="Error al crear factura" description="Verifique todos los campos" />}
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" icon="times" content="Close" onClick={this.closeModal} />
            <Button color="green" icon="save" content="Save"  onClick={this.createCompra} />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default ModalCompras