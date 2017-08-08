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
        type="number"
        placeholder="0"
      /><br />
      <button
        onClick={() => {
          sendFunds(inputValue);
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
