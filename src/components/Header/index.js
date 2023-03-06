/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import './Header.scss';

function Header({ name }) {
  return (
    <header>
      <div className='header__content'>
        {name && <span className='header__user-name'>{name}</span>}
      </div>
    </header>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Header;
