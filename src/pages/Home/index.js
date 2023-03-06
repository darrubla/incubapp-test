import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Container } from '@mui/material';
import ButtonComponent from '../../components/Button';
import LoaderComponent from '../../components/Loader';

import GetCharactersList from '../../redux/actions/HomeActtions';
import { auth } from '../../services/firebase';

import './Home.scss';

function Home({ isloading, charactersList }) {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const [listado, setListado] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(GetCharactersList(page));
  }, [page]);

  useEffect(() => {
    if (charactersList?.length >= 1) {
      setListado(charactersList);
    }
  }, [charactersList]);

  const handleListado = () => {
    if (listado && user) {
      return console.log(listado);
    }
    return null;
  };

  const handleClick = ({ name }) => {
    if (name === 'next') setPage(page + 1);
    if (name === 'back' && page >= 20) setPage(page - 1);
  };

  return (
    <Container>
      <LoaderComponent show={isloading} />
      <section className='home'>{user && handleListado()}</section>
      {listado?.length >= 20 && (
        <div className='home__nav-buttons'>
          <ButtonComponent
            name='back'
            id='Back-btn'
            action={({ target }) => handleClick(target)}
            variant='contained'
            text='< Back'
          />
          <ButtonComponent
            name='next'
            id='Next-btn'
            action={({ target }) => handleClick(target)}
            variant='contained'
            text='Next >'
          />
        </div>
      )}
    </Container>
  );
}

Home.propTypes = {
  isloading: PropTypes.bool.isRequired,
  charactersList: PropTypes.array.isRequired,
};

function mapStateToProps({
  Home: { charactersList, charactersListIsLoading },
}) {
  return {
    isloading: charactersListIsLoading,
    charactersList,
  };
}

export default connect(mapStateToProps)(Home);
