import React, { Component } from 'react';

export default class AddFunds extends Component {
  state = {
    userInput: ''
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  sendFunds = e => {
    e.preventDefault();
    let { userInput } = this.state;
    this.props
      .sendFunds(userInput)
      .then(res => {
        if (res.status === 200) {
          this.setState({ userInput: '' });
        }
      })
      .catch(alert);
  };

  render() {
    return (
      <form onSubmit={this.sendFunds}>
        <input
          onChange={this.handleInputChange}
          name="userInput"
          value={this.state.userInput}
          id="myInput"
          type="number"
          placeholder="Payback some debt"
        />
        <button style={{ marginLeft: '20px' }} type="submit">
          Show Me Tha’ Money!
        </button>
      </form>
    );
  }
}
