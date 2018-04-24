import React, { Component } from 'react';
import Layout from './Layout';
import Chatbox from './Chatbox';
import Sidebar from './Sidebar'
import './App.css';
import UsernameForm from './Username/index'

class App extends Component {

    constructor() {
       super()
       this.state = {
          currentUsername: '',
          currentId: '',
          currentScreen: 'usernameInputScreen'
        }
        this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this)
      }
    
      onUsernameSubmitted(username) {
        fetch('http://localhost:3001/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username }),
        })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.setState({
            currentId: data.id,
            currentUsername: data.name,
            currentScreen: 'ChatScreen'
          })
        })
        .catch(error => console.error('error', error))
      }

  render() {
/* 
 
The username submission is not adding any user to the /users endpoint
thus this conditional doesn't open the chatscreen when a username is submitted
.... don't know why, but am guessing it has to do with the server.

*/
      if (this.state.currentScreen === 'usernameInputScreen') {
       return <UsernameForm handleSubmit = {this.onUsernameSubmitted}/>
      }
     if (this.state.currentScreen === 'ChatScreen') {
      return <Layout Sidebar={Sidebar} Chatbox={() => <Chatbox currentId={this.state.currentId} />} />
    }
    
  }
}

export default App;
