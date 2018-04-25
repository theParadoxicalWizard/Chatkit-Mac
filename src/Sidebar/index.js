import React, { Component } from 'react';
import './Sidebar.css';
import WhosOnlineList from '../WhosOnlineList/WhosOnlineList'
import {
  ListView,
  ListViewSection,
  ListViewSectionHeader,
  ListViewRow,
  Text
} from 'react-desktop/macOs';

class Sidebar extends Component {
  constructor() {
    super();
    this.state = { selected: null };
  }

  render() {
    return (
      <ListView background="#e1e1e1" width="300" height="600">
        <ListViewSection header={this.renderSectionHeader('Users')}>
        <h2>User Who are online Appears here</h2>
        </ListViewSection>
      </ListView>
    );
  }

  renderSectionHeader(title) {
    return <ListViewSectionHeader>{title}</ListViewSectionHeader>;
  }

  renderItem(title, info) {
    return (
      <ListViewRow
        onClick={() => this.setState({ selected: title })}
        background={this.state.selected === title ? '#d8dadc' : null}
      >
        <div className="status"></div>
        <Text color="#414141" size="13">
          {info}
        </Text>
      </ListViewRow>
    );
  }
}

export default Sidebar;

