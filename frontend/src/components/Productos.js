import React, { Component } from 'react'
import Axios from 'axios'
import ModalClientes from './ModalCliente'
import ModalConfirm from './ModalConfirm';
import ModalProductos from './ModalProductos';

class Productos extends Component {

    constructor(props) {
        super(props);

        this.state = {
            productos: [],
            initvalues: [],
            idDelete: '',
            showModal: false,
            showModalConfirm: false
        }
    }

    openModal = (event) => {
        var id = event.target.value
        if (id) {
            for (var i in this.state.productos) {
                if (this.state.productos[i].id == id) {
                    this.state.initvalues = this.state.productos[i]
                }
            }
        }
        else {
            this.state.initvalues = []
        }
        this.setState({ showModal: true })
    }

    closeModal = () => {
        this.setState({ showModal: false })
    }

    componentDidMount() {
        this.getproductos()
    }

    getproductos = () => {
        try {
            const tokens = JSON.parse(sessionStorage.getItem('loginState'))
            Axios.get('http://localhost:5000/productoslist', {
                headers: { authorization: tokens.access_token }
            })
                .then(result => {
                    const productos = result.data;
                    this.setState({ productos: productos })
                }).catch(res => {
                    console.log('sin respuesta')
                })
        }
        catch (error) {
            console.error(error)
        }
    }

    eliminar = (event) => {
        this.setState({ idDelete: event.target.value });
        this.setState({ showModalConfirm: true })
    }

    confirmDelete = () => {
        const id = this.state.idDelete
        const tokens = JSON.parse(sessionStorage.getItem('loginState'))
        Axios.delete('http://localhost:5000/productos/' + id, {
            headers: { authorization: tokens.access_token }
        })
            .then(res => {
                this.setState({ showModalConfirm: false })
                this.getproductos()
            }).catch(res => {
                console.log("Error")
            }
            )
    }

    cancelDelete = () => {
        this.setState({ showModalConfirm: false })
    }

    render() {
        return (
            <div class="ui raised very padded text container segment">
                <div class="ui relaxed divided list">
                    <h3 class="ui center aligned header ui block header" >
                    productos
                </h3>
                    <div class="item">
                        <table class="ui celled table">
                            <thead>
                                <tr><th>id</th>
                                    <th>descipcion</th>
                                    <th>precio</th>  
                                    <th>editar</th>                                   
                                </tr></thead>
                            <tbody>
                                {this.state.productos.map(productos => {
                                    return (
                                        <tr>
                                            <td data-label="id">{productos.id}</td>
                                            <td data-label="name">{productos.description}</td>
                                            <td data-label="address">{productos.price}</td>                                            
                                            <td>
                                                <button value={productos.id} onClick={this.openModal}> editar </button>
                                                <button value={productos.id} onClick={this.eliminar}> delete </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="ui center aligned basic segment">
                    <div class="ui left icon action input">
                        <div class="ui teal labeled icon button" onClick={this.openModal} >
                            Agregar Producto
                               <i class="add icon"></i>
                        </div>

                    </div>
                </div>
                {this.state.showModal && <ModalProductos onClose={this.closeModal} upDate={this.getproductos} values={this.state.initvalues} url='http://localhost:5000/productos' />}
                <ModalConfirm open={this.state.showModalConfirm} mensaje="Estas seguro de eliminar estos registros ?" confirm={this.confirmDelete} cancel={this.cancelDelete} />
            </div>
        )
    }
}

export default Productos;