import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AddFunds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      description: ''
    };
    this.sendFunds = this.sendFunds.bind(this);
  }
  handleInputChange(e, prop, debtOrNah) {
    let val = e.target.value;
    if (debtOrNah === '-') {
      val = 0 - val;
    }
    this.setState({ [prop]: val });
  }
  sendFunds({ inputValue, description }) {
    if (inputValue && description) {
      this.props.sendFunds({ inputValue, description });
    }
  }
  render() {
    return (
      <div className="">
        <input
          onChange={e => this.handleInputChange(e, 'inputValue', '+')}
          id="myInput"
          type="number"
          placeholder="Funds to Add"
        />
        <input
          onChange={e => this.handleInputChange(e, 'inputValue', '-')}
          id="myInput"
          type="number"
          placeholder="Add to debt"
        />
        <br />
        <input
          id="descriptionInput"
          type="text"
          placeholder="Description"
          onChange={e => this.handleInputChange(e, 'description')}
        />
        <br />
        <button onClick={() => this.sendFunds(this.state)} type="button">
          Show Me Tha’ Money!{' '}
        </button>
        <div className="red">{this.props.successOrFail}</div>
      </div>
    );
  }
}

AddFunds.defaultProps = {
  successOrFail: ''
};
AddFunds.propTypes = {
  sendFunds: PropTypes.func.isRequired,
  successOrFail: PropTypes.string.isRequired
};
