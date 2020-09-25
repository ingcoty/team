import React, { Component } from 'react'
import Axios from 'axios'
import ModalClientes from './ModalCliente'
import ModalConfirm from './ModalConfirm';

class Proveedores extends Component {

    constructor(props) {
        super(props);

        this.state = {
            proveedores: [],
            initvalues: [],
            idDelete: '',
            showModal: false,
            showModalConfirm: false
        }
    }

    openModal = (event) => {
        var id = event.target.value
        if (id) {
            for (var i in this.state.proveedores) {
                if (this.state.proveedores[i].id == id) {
                    this.state.initvalues = this.state.proveedores[i]
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
        this.getproveedores()
    }

    getproveedores = () => {
        try {
            const tokens = JSON.parse(sessionStorage.getItem('loginState'))
            Axios.get('http://localhost:5000/proveedoreslist', {
                headers: { authorization: tokens.access_token }
            })
                .then(result => {
                    const proveedores = result.data;
                    this.setState({ proveedores: proveedores })
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
        Axios.delete('http://localhost:5000/proveedores/' + id)
            .then(res => {
                this.setState({ showModalConfirm: false })
                this.getproveedores()
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
                        Proveedores
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
                                {this.state.proveedores.map(proveedores => {
                                    return (
                                        <tr>
                                            <td data-label="id">{proveedores.id}</td>
                                            <td data-label="name">{proveedores.name}</td>
                                            <td data-label="address">{proveedores.address}</td>
                                            <td data-label="email">{proveedores.email}</td>
                                            <td data-label="phone">{proveedores.phone}</td>
                                            <td>
                                                <button value={proveedores.id} onClick={this.openModal}> editar </button>
                                                <button value={proveedores.id} onClick={this.eliminar}> delete </button>
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
                            Agregar Proveedor
                               <i class="add icon"></i>
                        </div>

                    </div>
                </div>
                {this.state.showModal && <ModalClientes onClose={this.closeModal} upDate={this.getproveedores} values={this.state.initvalues} url='http://localhost:5000/proveedores' />}
                <ModalConfirm open={this.state.showModalConfirm} mensaje="Estas seguro de eliminar estos registros ?" confirm={this.confirmDelete} cancel={this.cancelDelete} />
            </div>
        )
    }
}


export default Proveedores;