import React, { Component } from 'react'
import Axios from 'axios'
import ModalConfirm from './ModalConfirm';
import ModalDetalle from './ModalDetalle'
import ModalCompras from './ModalCompras';

class Detalle extends Component {

    constructor(props) {
        super(props);

        this.state = {
            facturas: [],
            showModal: false,
            showModalConfirm: false,
            showModalDetalle: false,
            id:0
        }
    }

    closeModal = () => {
        this.setState({ showModal: false })
        this.setState({ showModalDetalle: false })
    }

    componentDidMount() {
        this.getCompras()
    }

    getCompras = () => {
        try {
            const tokens = JSON.parse(sessionStorage.getItem('loginState'))
            Axios.get('http://localhost:5000/facturalist', {
                headers: { authorization: tokens.access_token }
            })
                .then(result => {
                    const facturas = result.data;                  
                    this.setState({ facturas: facturas })
                }).catch(res => {
                    console.log('sin respuesta')
                })
        }
        catch (error) {
            console.error(error)
        }
    }

    detail = (obj) =>{
        this.setState({id:obj.target.value})
        this.setState({showModalDetalle:true})
    }

    openModalCompra = () =>{
        this.setState({showModal:true})
    }

    render() {
        return (
            <div class="ui raised very padded text container segment">
                <div class="ui relaxed divided list">
                    <h3 class="ui center aligned header ui block header" >
                        Facturas
                </h3>
                    <div class="item">
                        <table class="ui celled table">
                            <thead>
                                <tr><th>Id</th>
                                    <th>Date</th>
                                    <th>Provider</th>
                                    <th>Value</th>  
                                    <th>Detail</th>                                   
                                </tr></thead>
                            <tbody>
                                {this.state.facturas.map(facturas => {
                                    return (
                                        <tr>
                                            <td data-label="id">{facturas.id}</td>
                                            <td data-label="date">{facturas.date}</td>
                                            <td data-label="provider">{facturas.provider.name}</td>
                                            <td data-label="value">{facturas.value}</td>
                                            <td>
                                            <button value={facturas.id} onClick={this.detail}> Detail </button> 
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
                        <div class="ui teal labeled icon button" onClick={this.openModalCompra} >
                            Agregar Factura
                               <i class="add icon"></i>
                        </div>
                    </div>
                </div>
                { this.state.showModal && <ModalCompras onClose={this.closeModal} upDate={this.getCompras} url='http://localhost:5000/factura'/> }
                { this.state.showModalDetalle && <ModalDetalle onClose={this.closeModal} id={this.state.id} /> }
                <ModalConfirm open={this.state.showModalConfirm} mensaje="Estas seguro de eliminar estos registros ?" confirm={this.confirmDelete} cancel={this.cancelDelete} />
            </div>
        )
    }
}

export default Detalle;