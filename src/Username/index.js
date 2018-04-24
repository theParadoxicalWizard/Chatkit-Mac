import React, { Component } from 'react';
import { TextInput } from 'react-desktop/macOs';
import { Button } from 'react-desktop/macOs';

class UsernameForm extends Component {
 constructor() {
   super()
   this.state = {
     username: '',
   }
 }

 handleSubmit = e => {
    e.preventDefault();
    console.log('submitted !!');
    this.props.handleSubmit(this.state.username)
  };

  handleChange = e => {
      this.setState({username: e.target.value})
  };

  render() {
    return (
      
        <div>
            <form className="username" onSubmit={this.handleSubmit}>
                <h2>What is your username?</h2>
                    <TextInput
                        label="Enter Your Username"
                        placeholder="Username..."
                        defaultValue=""
                        onChange={this.handleChange}
                    />
                    <Button
                        color="blue"
                        type="submit"
                    >
                    Submit
                </Button>
                </form>
        </div>
    )
  }
}

 export default UsernameForm

