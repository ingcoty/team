import React, { Component } from 'react'
import { Modal, Form, Header, Button } from "semantic-ui-react";
import Axios from 'axios';
import ErrorMsg from './ErrorMsg'
import CmbAutocomplete from './CmbAutocomplete';

class ModalCompras extends Component {
  constructor(props) {
    super(props);
    this.getCodProvider = this.getCodProvider.bind(this)
    this.state = {      
      postHandler: false,
      providercode:''      
    }
  }

  componentDidMount() {

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

  getNumberId = event => {
    this.setState({ id: event.target.value })
  }

  getName = event => {
    this.setState({ name: event.target.value })
  }

  getAddress = event => {
    this.setState({ address: event.target.value })
  }

  getEmail = event => {
    this.setState({ email: event.target.value })
  }

  getPhone = event => {
    this.setState({ phone: event.target.value })
  }

  getCodProvider(code){
      this.setState({providercode:code})
  }

  getCodProduct(code){
    console.log(code)
  }

  closeModal = () => {
    this.props.onClose()
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

            <Form.Input label="id" required type="number" placeholder="Numero de Identificacion" onChange={this.getNumberId} value={this.state.id} />
            <Form.Input label="name" required type="text" placeholder="Nombre" onChange={this.getName} value={this.state.name} />
            <Form.Input label="address" required type="text" placeholder="Direccion" onChange={this.getAddress} value={this.state.address} />
            <Form.Input label="email" required type="text" placeholder="Email" onChange={this.getEmail} value={this.state.email} />
            <Form.Input label="phone" required type="number" placeholder="Telenfono" onChange={this.getPhone} value={this.state.phone} />
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