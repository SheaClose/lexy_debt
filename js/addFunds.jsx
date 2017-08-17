import React from 'react';
import PropTypes from 'prop-types';

const AddFunds = props => {
  let inputValue;
  const { sendFunds } = props;
  return (
    <div className="">
      <input
        onChange={e => {
          inputValue = e.target.value;
        }}
        onKeyDown={e => {
          if (e.keyCode === 13) {
            sendFunds(inputValue);
            e.target.value = '';
          }
        }}
        id="myInput"
        type="number"
        placeholder="Funds to Add"
      /><br />
      <button
        onClick={() => {
          sendFunds(inputValue);
          document.getElementById('myInput').value = '';
        }}
        type="button"
      >
        Show Me Tha&#8217; Money!{' '}
      </button>
    </div>
  );
};

export default AddFunds;

AddFunds.propTypes = {
  sendFunds: PropTypes.func.isRequired,
};
