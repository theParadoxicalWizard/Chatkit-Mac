import React from 'react';
import Chatkit from '@pusher/chatkit';
import './Layout.css';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      currentRoom: {},
      messages: [],
      currentUsername: '',
      currentId: '',
      currentScreen: 'usernameInputScreen',
      usersWhoAreTyping: []
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.sendTypingEvent = this.sendTypingEvent.bind(this);
  }

  sendTypingEvent() {
    this.state.currentUser
      .isTypingIn({ roomId: this.state.currentRoom.id })
      .catch(error => console.error('error', error));
  }

  sendMessage(text) {
    this.state.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoom.id
    });
  }
  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: 'v1:us1:fd0b2176-5481-4452-9424-f599f0bcee05',
      userId: this.props.currentId,
      tokenProvider: new Chatkit.TokenProvider({
        url: 'http://localhost:3001/authenticate'
      })
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.setState({ currentUser });
        return currentUser.subscribeToRoom({
          roomId: 21140875,
          messageLimit: 100,
          hooks: {
            onNewMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              });
            },
            onUserStartedTyping: user => {
              this.setState({
                usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name]
              });
            },
            onUserStoppedTyping: user => {
              this.setState({
                usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                  username => username !== user.name
                )
              });
            },

            onUserCameOnline: () => this.forceUpdate(),
            onUserWentOffline: () => this.forceUpdate(),
            onUserJoined: () => this.forceUpdate()
          }
        });
      })
      .then(currentRoom => {
        this.setState({ currentRoom });
      })
      .catch(error => console.error('error', error));
  }
  render() {
    const { Chatbox, Sidebar } = this.props;
    return (
      <div className="wrapper">
        <div className="left">
          <Sidebar
            currentUser={this.state.currentUser}
            users={this.state.currentRoom.users}
            usersWhoAreTyping={this.state.usersWhoAreTyping}
          />
        </div>

        <div className="right">
          <Chatbox
            messages={this.state.messages}
            sendMessage={this.sendMessage}
            onChange={this.sendTypingEvent}
            sendTypingEvent={this.sendTypingEvent}
            usersWhoAreTyping={this.state.usersWhoAreTyping}
          />
        </div>
      </div>
    );
  }
}

export default Layout;
