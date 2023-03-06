import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Icon } from '@material-ui/core';
import Header from '../../components/Header';

import { logout, auth } from '../../services/firebase';

import './Layout.scss';
import IsLogged from '../../utils/IsLogged';
import { userLoggedOut } from '../../redux/actions/AuthActions';

const url = ['/home/characters', '/favorites'];

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [user] = useAuthState(auth);
  const [value, setValue] = useState(url.indexOf(location.pathname));

  useEffect(() => {
    if ([0, 1].includes(value)) {
      navigate(url[value]);
    } else if (parseInt(value, 10) === 2) {
      logout();
      dispatch(userLoggedOut());
      navigate('/');
    }
  }, [value]);

  useEffect(() => {
    setValue(url.indexOf(location.pathname));
  }, [location]);

  return (
    <IsLogged>
      <section className='layout'>
        <Header name={user?.displayName} />
        {children}
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            onClick={() => {}}
            label='Home'
            icon={<Icon>home</Icon>}
          />
          <BottomNavigationAction
            label='Favorites'
            icon={<Icon>favorite</Icon>}
          />
          <BottomNavigationAction label='Logout' icon={<Icon>logout</Icon>} />
        </BottomNavigation>
      </section>
    </IsLogged>
  );
}

Layout.propTypes = {
  children: PropTypes.object.isRequired,
};
