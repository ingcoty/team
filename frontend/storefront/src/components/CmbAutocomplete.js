import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'
import Axios from 'axios'


class CmbAutocomplete extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.initvalue,
            options: []
        }
        this.source = this.props.source
    }


    componentDidUpdate(prevProps) {
        if (this.props.source !== prevProps.source) {
            const options = []
            Axios.get(this.props.source)
                .then(res => {
                    const data = res.data;
                    data.map(item => {
                        options.push({
                            value: item.ID,
                            text: item.NOMBRE
                        })
                    })
                    this.setState({ options })
                }
                )
        }
    }

    componentDidMount() {
        const options = []
        Axios.get(this.props.source)
            .then(res => {
                const data = res.data;
                data.map(item => {
                    if (item.name) {
                        options.push({
                            value: item.id,
                            text: item.name
                        })
                    }
                    else {
                        options.push({
                            value: item.id,
                            text: item.description
                        })
                    }
                })
                this.setState({ options })
            }
            )
    }

    getValue = (obj, { value }) => {
        this.setState({ value })
        this.props.getcode(value)
        //this.props.closeMsg()
    }

    render() {
        const { value } = this.state;
        return (
            <div>
                <div className="required field">
                    <label>{this.props.label}</label>
                </div>
                <Dropdown
                    placeholder={this.props.holder}
                    fluid
                    search
                    selection
                    options={this.state.options}
                    onChange={this.getValue}
                    value={value}
                />                
            </div>
        )
    }
}

export default CmbAutocomplete