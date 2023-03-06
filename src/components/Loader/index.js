import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Modal } from '@mui/material';
import { MutatingDots } from 'react-loader-spinner';

import './Loader.scss';

export default function LoaderComponent({ show }) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!show) {
      setTimeout(() => setOpen(false), 500);
    } else {
      setOpen(show);
    }
  }, [show]);

  return (
    <Modal
      className='loader-modal'
      open={open}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <MutatingDots
        type='Grid'
        color='#00BFFF'
        height={100}
        width={100}
        visible={open}
      />
    </Modal>
  );
}

LoaderComponent.propTypes = {
  show: PropTypes.bool,
};

LoaderComponent.defaultProps = {
  show: false,
};
