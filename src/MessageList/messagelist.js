 import React, { Component } from 'react'

 class MessageList extends Component {
   render() {

    // remove styles here and create a css file for it
    //  const styles = {
    //    container: {
    //      overflowY: 'scroll',
    //      flex: 1,
    //    },
    //    ul: {
    //      listStyle: 'none',
    //    },
    //    li: {
    //      marginTop: 13,
    //      marginBottom: 13,
    //    },
    //    senderUsername: {
    //      fontWeight: 'bold',
    //    },
    //    message: { fontSize: 15 },
    //  }
     return (
       <div className="message-div-style"
        //  style={{
        //    ...this.props.style,
        //    ...styles.container,
        //  }}
       >
         <ul className="message-style">
           {this.props.messages.map((message, index) => (
             <li key={index} className="message-style-li">
               <div>
                 <span className="message-sender-style">{message.senderId}</span>{' '}
               </div>
               <p className="message-text">{message.text}</p>
             </li>
           ))}
         </ul>
       </div>
     )
   }
 }

 export default MessageList