import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';

import AddFunds from './addFunds';

const Wrapper = styled.div`
  width: 80vw;
  height: 100vh;
  background-color: darkgrey;
  margin: auto;
  text-align: center;
  font-family: sans-serif;
`;
export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      debt: 0,
      originalDateOfDebt: new Date('Fri Aug 04 2017 13:20:43 GMT-0500 (CDT)'),
      currentDate: new Date(),
      money: 0,
    };
    axios
      .get('/api/debt')
      .then(response => {
        this.setState({ debt: response.data.pop().debt });
      })
      .catch(err => {
        console.warn('Something went wrong with getting the debt: ', err);
      });

    this.sendFunds = this.sendFunds.bind(this);
  }

  sendFunds(value) {
    axios
      .put('/api/debt', { value })
      .then(response => {
        this.setState({ debt: response.data.pop().debt });
      })
      .catch(err => {
        console.warn('Something went wrong with updating the debt: ', err);
      });
  }

  render() {
    const { originalDateOfDebt, currentDate } = this.state;
    const newDebt = +((currentDate - originalDateOfDebt) * 0.00000003805175)
      .toString()
      .split('')
      .slice(0, 4)
      .join('');
    const addFunds = this.props.path ? <AddFunds sendFunds={this.sendFunds} /> : null;
    // props.path ? <AddFunds sendFunds={this.sendFunds} /> : null
    return (
      <Wrapper className="">
        <img src="../public/favicon.ico" alt={'Show Me The Money!'} />
        <div className="">
          How much money does Lexy Owe? <br />
          ${this.state.debt + newDebt}
        </div>
        {addFunds}
      </Wrapper>
    );
  }
}

Landing.defaultProps = {
  path: '',
};

Landing.propTypes = {
  path: PropTypes.string.isRequired,
};
