import React, { Component } from 'react'
import {Confirm} from 'semantic-ui-react'

class ModalConfirm extends Component{

    state={
        open:false
    }
    
    handlerCancel = () =>{
        this.props.cancel()
    }

    handlerConfirm = () =>{
        this.props.confirm()
    }


    render(){
        return(
            <Confirm content={this.props.mensaje} 
               open={this.props.open}
               onCancel = {this.handlerCancel}
               onConfirm = {this.handlerConfirm}
            />                        
        )
    }
}

export default ModalConfirm