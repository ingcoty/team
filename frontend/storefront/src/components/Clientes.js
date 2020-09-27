import React, { Component } from 'react'
import Axios from 'axios'
import ModalCliente from './ModalCliente'
import ModalConfirm from './ModalConfirm';

class Clientes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            clientes: [],
            initvalues: [],
            idDelete: '',
            showModal: false,
            showModalConfirm: false
        }
    }

    openModal = (event) => {
        var id = event.target.value
        if (id) {
            for (var i in this.state.clientes) {
                if (this.state.clientes[i].id == id) {
                    this.setState({ initvalues: this.state.clientes[i] })
                }
            }
        }
        else {
            this.setState({ initvalues: [] })
        }
        this.setState({ showModal: true })
    }

    closeModal = () => {
        this.setState({ showModal: false })
    }

    componentDidMount() {
        this.getClients()
    }

    getClients = () => {
        try {
            const tokens = JSON.parse(sessionStorage.getItem('loginState'))
            Axios.get('http://localhost:5000/clienteslist', {
                headers: { authorization: tokens.access_token }
            })
                .then(result => {
                    const clientes = result.data;
                    this.setState({ clientes: clientes })
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
        const tokens = JSON.parse(sessionStorage.getItem('loginState'))
        const id = this.state.idDelete
        Axios.delete('http://localhost:5000/clientes/' + id, { headers: { authorization: tokens.access_token } })
            .then(res => {
                this.setState({ showModalConfirm: false })
                this.getClients()
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
                        Clientes
                </h3>
                    <div class="item">
                        <table class="ui celled table">
                            <thead>
                                <tr><th>id</th>
                                    <th>name</th>
                                    <th>address</th>
                                    <th>email</th>
                                    <th>phone</th>
                                    <th>editar</th>
                                </tr></thead>
                            <tbody>
                                {this.state.clientes.map(clientes => {
                                    return (
                                        <tr>
                                            <td data-label="id">{clientes.id}</td>
                                            <td data-label="name">{clientes.name}</td>
                                            <td data-label="address">{clientes.address}</td>
                                            <td data-label="email">{clientes.email}</td>
                                            <td data-label="phone">{clientes.phone}</td>
                                            <td>
                                                <button value={clientes.id} onClick={this.openModal}> editar </button>
                                                <button value={clientes.id} onClick={this.eliminar}> delete </button>
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
                            Agregar Cliente
                               <i class="add icon"></i>
                        </div>

                    </div>
                </div>
                {this.state.showModal && <ModalCliente onClose={this.closeModal} upDate={this.getClients} values={this.state.initvalues} url='http://localhost:5000/clientes' />}
                <ModalConfirm open={this.state.showModalConfirm} mensaje="Estas seguro de eliminar estos registros ?" confirm={this.confirmDelete} cancel={this.cancelDelete} />
            </div>
        )
    }
}


export default Clientes;