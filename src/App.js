import React, { Component } from 'react';
import Layout from './Layout';
import Chatbox from './Chatbox';
import Sidebar from './Sidebar'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout Sidebar={Sidebar} Chatbox={Chatbox} />
      </div>
    );
  }
}

export default App;
