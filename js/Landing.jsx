import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

import AddFunds from './addFunds';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
  text-align: center;
`;

const GradientCircle = styled.div`
  height: 100vh;
  border-radius: 85% 0;
  background-image: linear-gradient(to bottom left, #A71D31, #D5573B, #682d7a, #3C1B43);
  background-size: 2000px;
  position: relative;
  padding-top: 25%;
`;
const BodyContainer = styled.div`
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
      .get('http://localhost:3000/api/debt')
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
      .put('http://localhost:3000/api/debt', { value })
      .then(response => {
        this.setState({ debt: response.data.pop().debt });
      })
      .catch(err => {
        console.warn('Something went wrong with updating the debt: ', err);
      });
  }

  render() {
    function styleMyMoney(money) {
      const cents = money.toString().split('.')[1];
      switch (true) {
        case cents.length === 1:
          return `${money}0`;
        case !cents.length:
          return `${money}00`;
        default:
          return money;
      }
    }
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
        <GradientCircle>
          <BodyContainer>
            <div className="my_text">
              How much money does Lexy Owe? <br />
              ${styleMyMoney(this.state.debt + newDebt)}
            </div>
            {addFunds}
          </BodyContainer>
        </GradientCircle>

        {/* <Link to="/admin">Add Funds</Link> */}
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
