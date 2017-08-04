import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
      originalDebt: 0,
      originalDateOfDebt: new Date('Fri Aug 04 2017 13:20:43 GMT-0500 (CDT)'),
      currentDate: new Date(),
    };
    axios
      .get('http://localhost:3000/api/debt')
      .then(response => {
        this.setState({ originalDebt: response.data.pop().debt });
      })
      .catch(err => {
        console.warn('Something went wrong with getting the debt: ', err);
      });
  }

  render() {
    const { originalDateOfDebt, currentDate } = this.state;
    const newDebt = +((currentDate - originalDateOfDebt) * 0.00000003805175)
      .toString()
      .split('')
      .slice(0, 4)
      .join('');
    // console.log(+newDebt);
    return (
      <Wrapper className="">
        <img src="../public/favicon.ico" alt={'Show Me The Money!'} />
        <div className="">
          How much money does Lexy Owe? <br />
          ${this.state.originalDebt + newDebt}
        </div>
      </Wrapper>
    );
  }
}
