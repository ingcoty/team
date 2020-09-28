import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Component } from 'react'
import Axios from 'axios'
import ErrorMsg from './ErrorMsg'

class Login extends Component {

    constructor(props) {
        super(props);
        this.userName = ''
        this.password = ''
        this.state = {
            logged: false,
            showErrorMsg: false
        }
    }

    access = () => {
        const data = { 'user': this.userName, 'password': this.password }
        Axios.post('http://localhost:5000/login', data)
            .then(res => {
                console.log(res)
                if (res.data.auth == "true") {
                    let credentials = {
                        'access_token': res.data.access_token,
                        'refresh_token': res.data.refresh_token,
                        'logged': res.data.auth,
                    }
                    sessionStorage.setItem('loginState', JSON.stringify(credentials))
                    this.setState({ logged: true })
                    this.props.updateLogin()
                }
                else{
                    this.setState({ showErrorMsg: true })
                }
            }).catch(res => {
                this.setState({ showErrorMsg: true })
            }
        )
    }

    closeMsg = () =>{
        this.setState({showErrorMsg:false})
    }

    getUser = (event) => {
        this.userName = event.target.value
    }

    getPass = (event) => {
        this.password = event.target.value
    }

    render() {
        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Form size='large'>
                        <Segment stacked>
                            <Header as='h2' color='teal' textAlign='center'>
                                Team Store
                            </Header>
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='Usuario' onChange={this.getUser} />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                onChange={this.getPass}
                            />

                            <Button color='teal' fluid size='large' onClick={this.access}>
                                Login
                             </Button>
                        </Segment>                       
                    </Form>
                    <Message>
                    {this.state.showErrorMsg && <ErrorMsg title='Error' description='usuario o contraseña no válidos' closeMsg={this.closeMsg}/>}
                    </Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Login