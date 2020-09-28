import React, { Component } from 'react'
import { Modal, Form, Header, Button } from "semantic-ui-react";
import Axios from 'axios';
import ErrorMsg from './ErrorMsg'

class ModalCliente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      address: '',
      email: '',
      phone: '',
      postHandler: false,
      edit: false
    }
  }

  componentDidMount() {
    if (Object.keys(this.props.values).length) {
      this.setState({ id: this.props.values.id });
      this.setState({ name: this.props.values.name });
      this.setState({ address: this.props.values.address });
      this.setState({ email: this.props.values.email });
      this.setState({ phone: this.props.values.phone });
      this.setState({ edit: true });
    }
    else {
      this.setState({ edit: false });;
    }
  }


  createClient = event => {
    event.preventDefault()
    const data = {
      id: this.state.id, name: this.state.name, address: this.state.address,
      email: this.state.email, phone: this.state.phone
    }
    const tokens = JSON.parse(sessionStorage.getItem('loginState'))
    if (this.state.edit) {
      Axios.put(this.props.url, { data }, {
        headers: { authorization: tokens.access_token }
      })
        .then(res => {
          this.closeModal()
          this.props.upDate()
        }).catch(res => {
          this.setState({ postHandler: true })
        }
        )
    }
    else {
      Axios.post(this.props.url, { data }, {
        headers: { authorization: tokens.access_token }
      })
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

  closeModal = () => {
    this.props.onClose()
  }

  render() {
    return (
      <div>
        <Modal as={Form} onSubmit={this.createClient} open={true} size="tiny">
          <Header icon="pencil" content="Agregar Resolución" as="h3" />
          <Modal.Content>
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

export default ModalCliente