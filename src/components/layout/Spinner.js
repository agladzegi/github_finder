import React from 'react';

const Spinner = () => (
  <div style={spinnerStyle}>
    <div className='lds-dual-ring'></div>
  </div>
);

const spinnerStyle = {
  width: '100%',
  textAlign: 'center',
  marginTop: '5rem'
};

export default Spinner;
