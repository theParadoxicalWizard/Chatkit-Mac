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
          </Text> */}
      
          {/* 
          
          <WhosOnlineList
              currentUser={this.state.currentUser}
              users={this.state.currentRoom.users}
      /> */}
       
      </ListViewRow>
    );
  }
}

export default Chatbox;


// import React, { Component } from 'react';
// import './Chatbox.css';
// import Chatkit from '@pusher/chatkit'
// import {
//   ListView,
//   ListViewSection,
//   ListViewSectionHeader,
//   ListViewRow,
//   Text,
//   TextInput,
//   Button
// } from 'react-desktop/macOs';

// class Chatbox extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       currentUser: {}
//     };
//   }

//   /*

//   In the componentDidMount() method below, i'm trying to connect the chatbox with my chatkit instance, if i uncomment 
//   it, the ChatBox screen wont render, it'll throw a TypeError :
//   "expected userId to be of type string but was of type undefined"
// */
  
// componentDidMount () {
//     const chatManager = new Chatkit.ChatManager({
//       instanceLocator: 'v1:us1:f722c949-ddf2-4e88-908e-20ff810e0e21',
//       userId: this.props.currentUsername, //problem in this line, expected userId to be String, while it is undefined.
//       tokenProvider: new Chatkit.TokenProvider({
//         url: 'http://localhost:3001/authenticate',
//       }),
//     })

//     chatManager
//       .connect()
//       .then(currentUser => {
//         this.setState({ currentUser })
//       })
//       .catch(error => console.error('error', error))
//   }

//   handleChange = e => console.log(e.target.value);

//   handleSubmit = e => {
//     e.preventDefault();
//     console.log('asshole');
//   };

//   render() {
//     return (
//       <div>
//         <ListView background="#f1f2f4" width="500" height="555">
//           <ListViewSection header={this.renderSectionHeader('Messages')}>
//             {this.renderItem('Item 1', 'This is the first item.')}
//             {this.renderItem('Item 2', 'This is the second item.')}
//             {this.renderItem('Item 3', 'This is the third item.')}
//           </ListViewSection>
//         </ListView>
//         <form className="message" onSubmit={this.handleSubmit}>
//           <TextInput
//             placeholder="Type message here and hit ENTER"
//             defaultValue=""
//             className="message-text"
//             onChange={this.handleChange}
//           />
//           <Button
//             color="blue"
//             type="submit"
//             onClick={() => console.log('Clicked!')}
//           >
//             Press me!
//           </Button>
//         </form> 
      
//       </div>
//     );
//   }

//   renderSectionHeader(title) {
//     return <ListViewSectionHeader>{title}</ListViewSectionHeader>;
//   }

//   renderItem(title, info) {
//     return (
//       <ListViewRow
//         onClick={() => this.setState({ selected: title })}
//         layout="vertical"
//         background={this.state.selected === title ? '#d8dadc' : null}
//       >
//         <div>
//           <Text color="#414141" size="13" bold>
//             Title:
//           </Text>
//           <Text color="#414141" size="13">
//             {info}
//           </Text>
//         </div>
//       </ListViewRow>
//     );
//   }
// }

// export default Chatbox;
