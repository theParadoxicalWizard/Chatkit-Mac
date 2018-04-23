import React, { Component } from 'react';
import './Chatbox.css';
import {
  ListView,
  ListViewSection,
  ListViewSectionHeader,
  ListViewRow,
  Text,
  TextInput,
  Button
} from 'react-desktop/macOs';

class Chatbox extends Component {
  constructor() {
    super();
    this.state = { selected: null };
  }

  handleChange = e => console.log(e.target.value);

  handleSubmit = e => {
    e.preventDefault();
    console.log('asshole');
  };

  render() {
    return (
      <div>
        <ListView background="#f1f2f4" width="500" height="555">
          <ListViewSection header={this.renderSectionHeader('Messages')}>
            {this.renderItem('Item 1', 'This is the first item.')}
            {this.renderItem('Item 2', 'This is the second item.')}
            {this.renderItem('Item 3', 'This is the third item.')}
          </ListViewSection>
        </ListView>
        <form className="message" onSubmit={this.handleSubmit}>
          <TextInput
            placeholder="Type message here and hit ENTER"
            defaultValue=""
            className="message-text"
            onChange={this.handleChange}
          />
          <Button
            color="blue"
            type="submit"
            onClick={() => console.log('Clicked!')}
          >
            Press me!
          </Button>
        </form>
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
        <div>
          <Text color="#414141" size="13" bold>
            Title:
          </Text>
          <Text color="#414141" size="13">
            {info}
          </Text>
        </div>
      </ListViewRow>
    );
  }
}

export default Chatbox;
