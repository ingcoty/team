import React, { Component } from 'react'
import { Modal, Form, Header, Button } from "semantic-ui-react";
import Axios from 'axios';
import ErrorMsg from './ErrorMsg'

class ModalProductos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      description: '',
      price: '',   
      postHandler: false,
      edit: false
    }    
  }

  componentDidMount(){
    if (Object.keys(this.props.values).length) {      
      this.setState({id:this.props.values.id});
      this.setState({description:this.props.values.description});
      this.setState({price:this.props.values.price});     
      this.setState({edit:true});     
    }
    else{
      this.setState({edit:false});;
    }
  }


  createProduct = event => {
    event.preventDefault()
    const data = {
      id: this.state.id, description: this.state.description, price: this.state.price
    }
    console.log(data)
    const tokens = JSON.parse(sessionStorage.getItem('loginState'))
    if (this.state.edit) {      
      Axios.put(this.props.url, { data }, {headers: { authorization: tokens.access_token }})
        .then(res => {
          this.closeModal()
          this.props.upDate()
        }).catch(res => {
          this.setState({ postHandler: true })
        }
        )
    }
    else {      
      Axios.post(this.props.url, { data }, {headers: { authorization: tokens.access_token }})
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

  getDescription = event => {
    this.setState({ description: event.target.value })
  }

  getPrice = event => {
    this.setState({ price: event.target.value                                                                                                                          })
  }

  closeModal = () => {
    this.props.onClose()
  }

  render() {
    return (
      <div>
        <Modal as={Form} onSubmit={this.createProduct} open={true} size="tiny">
          <Header icon="pencil" content="Agregar Producto" as="h3" />
          <Modal.Content>
            <Form.Input label="id" required type="number" placeholder="Numero de Identificacion" onChange={this.getNumberId} value={this.state.id} />
            <Form.Input label="description" required type="text" placeholder="Descripcion" onChange={this.getDescription} value={this.state.description} />
            <Form.Input label="price" required type="number" placeholder="Precio" onChange={this.getPrice} value={this.state.price} />            
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

export default ModalProductos