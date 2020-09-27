import React, { Component } from 'react'

class ErrorMsg extends Component {

    close = () => {
        this.props.closeMsg()
    }

    render() {
        return (
            <div class="ui negative message">
                <i class="close icon" onClick={this.close}></i>
                <div class="header"> {this.props.title} </div>
                <p>{this.props.description}</p>
            </div>
        )
    }
}

export default ErrorMsg