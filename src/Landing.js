import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';
import moment from 'moment';
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
  background-image: linear-gradient(
    to bottom left,
    #a71d31,
    #d5573b,
    #682d7a,
    #3c1b43
  );
  background-size: 2000px;
  position: relative;
  padding-top: 25%;
`;
const BodyContainer = styled.div``;

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      debt: 0,
      /** date that insurance changed */
      originalDateOfDebt: new Date('Fri Aug 04 2017 13:20:43 GMT-0500 (CDT)'),
      currentDate: new Date(),
      money: 0
    };
    axios
      .get('/api/debt')
      .then(response => this.setState({ debt: response.data }))
      .catch(console.log);

    this.sendFunds = this.sendFunds.bind(this);
  }

  sendFunds(inputValue) {
    return axios
      .put('/api/debt', {
        inputValue,
        date: new Date().toString()
      })
      .then(response => {
        this.setState({ debt: response.data });
        return response;
      });
  }

  render() {
    const { originalDateOfDebt, currentDate } = this.state;
    const newDebt = +((currentDate - originalDateOfDebt) * 0.00000002150175)
      .toString()
      .split('')
      .slice(0, 5)
      .join('');
    const addFunds = this.props.path ? (
      <AddFunds sendFunds={this.sendFunds} />
    ) : null;
    return (
      <Wrapper className="">
        <GradientCircle>
          <BodyContainer>
            <div className="my_text">
              How much money does Lexy Owe? <br />$
              {styleMyMoney(this.state.debt + newDebt)}
            </div>
            {addFunds}
          </BodyContainer>
        </GradientCircle>
      </Wrapper>
    );
  }
}

Landing.defaultProps = {
  path: ''
};

Landing.propTypes = {
  path: PropTypes.string.isRequired
};

function styleMyMoney(money) {
  return money.toString().split('.')[0];
}
