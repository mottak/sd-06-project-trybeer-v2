import React from 'react';
import PropTypes from 'prop-types';

import '../pages/ClientProfile.css';

function InputProfile({ id, title, type, callback, value }) {
  return (
    <label htmlFor={ id }>
      { title }
      <br />
      <input
        className="inputProfile"
        type={ type }
        data-testid={ id }
        value={ value }
        onChange={ callback }
      />
    </label>
  );
}

InputProfile.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default InputProfile;
