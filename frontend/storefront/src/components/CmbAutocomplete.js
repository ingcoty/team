import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'
import Axios from 'axios'


class CmbAutocomplete extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.initvalue,
            options: [],
            fulldata: []
        }
        this.source = this.props.source
    }

    componentDidMount() {
        const options = []
        const tokens = JSON.parse(sessionStorage.getItem('loginState'))
        Axios.get(this.props.source, {headers: { authorization: tokens.access_token }})
            .then(res => {
                const data = res.data;
                this.setState({ fulldata: data })
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
        for (var i in this.state.fulldata) {
            if (this.state.fulldata[i].id == value) {
                this.props.getcode(this.state.fulldata[i])
            }
        }
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