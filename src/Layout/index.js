import React from 'react';
import './Layout.css';

const Layout = ({ Sidebar, Chatbox }) => (
  <div className="wrapper">
    <div className="left">
      {/* <h1>Title</h1> */}
      <Sidebar />
    </div>
    <div className="right">
      <Chatbox />
    </div>
  </div>
);


export default Layout;