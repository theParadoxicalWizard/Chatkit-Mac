import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit'
import Layout from './Layout';
import Chatbox from './Chatbox';
import Sidebar from './Sidebar';
//import WhosOnlineList from './WhosOnlineList/WhosOnlineList'
import './App.css';
import UsernameForm from './Username/index';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

      currentUsername: '',
      currentId: '',
      currentScreen: 'usernameInputScreen'
    };
    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this);
  }

  onUsernameSubmitted(username) {
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          currentId: data.id,
          currentUsername: data.name,
          currentScreen: 'ChatScreen'
        });
      })
      .catch(error => console.error('error', error));
  }

  render() {
    if (this.state.currentScreen === 'usernameInputScreen') {
      return <UsernameForm handleSubmit={this.onUsernameSubmitted} />;
    }
    if (this.state.currentScreen === 'ChatScreen') {
      return (
        <Layout
          currentId={this.state.currentId}
          Sidebar={Sidebar}
          Chatbox={Chatbox}
        />
      );
    }
  }
}

export default App;
