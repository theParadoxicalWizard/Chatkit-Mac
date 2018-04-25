import React from 'react';
import Chatkit from '@pusher/chatkit';
import './Layout.css';
import TypingIndicator from '../TypingIndicator/TypingIndicator'

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
    this.sendTypingEvent = this.sendTypingEvent.bind(this)
  }

  sendTypingEvent() {
      this.state.currentUser
        .isTypingIn({ roomId: this.state.currentRoom.id })
        .catch(error => console.error('error', error))
      }

  sendMessage(text) {
    this.state.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoom.id
    });
  }
  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: 'v1:us1:f722c949-ddf2-4e88-908e-20ff810e0e21',
      userId: this.props.currentId,
      tokenProvider: new Chatkit.TokenProvider({
        url: 'http://localhost:3001/authenticate'
      })
    });

    chatManager
      .connect()
      .then(currentUser => {
        console.log(currentUser);
        this.setState({ currentUser });
        return currentUser.subscribeToRoom({
          roomId: 6855151,
          messageLimit: 100,
          hooks: {
            onNewMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              });
            },
            onUserStartedTyping: user => {
              this.setState({
                usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name],
              })
            },
            onUserStoppedTyping: user => {
              this.setState({
                usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                  username => username !== user.name
                ),
              })
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
  handleChange = e => {
    console.log(e.target.value);
  };

  handleSubmit = e => {
    console.log('handleSubmit');
  };
  render() {
    const { Chatbox, Sidebar, TypingIndicator } = this.props;
    return (
      <div className="wrapper">
        <div className="left">
          {/* <h1>Title</h1> */}
          <Sidebar
            currentUser={this.state.currentUser}
            users={this.state.currentRoom.users}
          />
        </div>

        <div className="right">
          <Chatbox
            messages={this.state.messages}
            sendMessage={this.sendMessage}
          />

        </div>

        <div className="bottom">
          <TypingIndicator 
              usersWhoAreTyping={this.state.usersWhoAreTyping} />
        </div>
        
      </div>
    );
  }
}

export default Layout;

// import React from 'react';
// import './Layout.css';

// const Layout = ({ Sidebar, Chatbox }) => (
//   <div className="wrapper">
//     <div className="left">
//       {/* <h1>Title</h1> */}
//       <Sidebar />
//     </div>
//     <div className="right">
//       <Chatbox />
//     </div>
//   </div>
// );


// export default Layout;