import React, { Component } from 'react';
import './Chatbox.css';
import Chatkit from '@pusher/chatkit'
import MessageList from '../MessageList/messagelist'
import SendMessageForm from'../SendMessageForm/SendMessageForm'
//import TypingIndicator from'../TypingIndicator/TypingIndicator'
import WhosOnlineList from '../WhosOnlineList/WhosOnlineList'
import {
  ListView,
  ListViewSection,
  ListViewSectionHeader,
  ListViewRow,
  Text
} from 'react-desktop/macOs';

class Chatbox extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    }
  }

  render() {
    return (
      <div>
        <ListView background="#f1f2f4" width="500" height="555">
          <ListViewSection header={this.renderSectionHeader('Messages')}>
           
            <MessageList
              messages={this.props.messages}
              className="message-list-style"
            />
            {/* <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} /> */}
           
          </ListViewSection>
        </ListView>
        <SendMessageForm onSubmit={this.props.sendMessage} /* onChange={this.sendTypingEvent}*/ />
      
      </div>
    );
  }

  renderSectionHeader(title) {
    return <ListViewSectionHeader>{title}</ListViewSectionHeader>;
  }

  renderItem(title, info) {
    return (
      <ListViewRow
        onClick={() => this.setState({ selected: title })}
        layout="vertical"
        background={this.state.selected === title ? '#d8dadc' : null}
      >
          <Text color="#414141" size="13" bold>
            Title:
          </Text>
          <Text color="#414141" size="13">
            {info}
          </Text>        
      </ListViewRow>
    );
  }
}

export default Chatbox;
