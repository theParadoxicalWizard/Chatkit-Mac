import React, { Component } from 'react';
import Layout from './Layout';
import Chatbox from './Chatbox';
import Sidebar from './Sidebar'
import './App.css';
<<<<<<< HEAD
import UsernameForm from './Username/index'

class App extends Component {

    constructor() {
       super()
       this.state = {
          currentUsername: '',
          currentScreen: 'ChatScreen'
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
          .then(response => {
            this.setState({
              currentUsername: username,
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
      return <Layout Sidebar={Sidebar} Chatbox={Chatbox} />
    }
    
=======

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout Sidebar={Sidebar} Chatbox={Chatbox} />
      </div>
    );
>>>>>>> 8da14c572de48dbd11bd1355f4632fbd9edd3854
  }
}

export default App;
