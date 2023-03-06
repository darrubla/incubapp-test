import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Container } from '@mui/material';
import ButtonComponent from '../../components/Button';
import LoaderComponent from '../../components/Loader';
import Card from '../../components/Card';

import GetCharactersList from '../../redux/actions/HomeActtions';
import { auth } from '../../services/firebase';

import './Home.scss';

function Home({ isloading, charactersList }) {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const [listado, setListado] = useState(null);
  const [info, setInfo] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(GetCharactersList(page));
  }, [page]);

  useEffect(() => {
    if (charactersList?.results) {
      setListado(charactersList.results);
      setInfo(charactersList.info);
    }
  }, [charactersList]);

  const handleListado = () => {
    if (listado && user) {
      return listado.map((cardItem) => (
        <Card
          user={user.email}
          key={cardItem.id}
          cardItem={cardItem}
          type='character'
        />
      ));
    }
    return null;
  };

  const handleClick = ({ name }) => {
    if (name === 'next') return setPage(page + 1);
    return setPage(page - 1);
  };

  return (
    <Container>
      <LoaderComponent show={isloading} />
      <section className='home'>{user && handleListado()}</section>
      <div className='home__nav-buttons'>
        {info?.prev && (
          <ButtonComponent
            name='back'
            id='Back-btn'
            action={({ target }) => handleClick(target)}
            variant='contained'
            text='< Back'
          />
        )}
        {info?.next && (
          <ButtonComponent
            name='next'
            id='Next-btn'
            action={({ target }) => handleClick(target)}
            variant='contained'
            text='Next >'
          />
        )}
      </div>
    </Container>
  );
}

Home.propTypes = {
  isloading: PropTypes.bool.isRequired,
  charactersList: PropTypes.object.isRequired,
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
