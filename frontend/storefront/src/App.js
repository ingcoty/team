import React, { Component } from 'react';
import './App.css';

import Routes from './Routes'
import WorkMenu from './components/WorkMenu';
import Login from './components/Login';
import {UserContext} from './components/UserContext'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      credentials: [],
      logged:false
    }
  }

  componentDidMount() {
    const credentials = JSON.parse(sessionStorage.getItem('loginState'))
    if (credentials != null) {
      this.setState({ credentials: credentials })
      this.setState({ logged: credentials.logged })
    }
  }

  updateState = () => {
    this.setState({ logged: true })
  }

  logout=()=>{
    sessionStorage.removeItem('loginState')
    this.setState({logged:false})
  }

  render() {
    const value={
      logged: this.state.logged,
      credentials: this.state.credentials,
      logout: this.logout
    }
    return (     
      <div>
        {!this.state.logged && <Login updateLogin={this.updateState} />}
        <UserContext.Provider value={value}>
          {this.state.logged && <WorkMenu />}
          {this.state.logged && <Routes/>}
        </UserContext.Provider>
      </div>
    )
  }
}
export default App;