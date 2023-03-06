/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Icon } from '@material-ui/core';
import { Button } from '@mui/material';

import {
  addFavorites,
  updateFavorites,
  removeFavorites,
  db,
} from '../../services/firebase';

import './Card.scss';

export default function Card({ cardItem, user, type }) {
  const [docListener, setDocListener] = useState(0);
  const [favoritesList, setFavoritesList] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    const unsubscribe = db.collection('usuarios').onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const list = data.filter((item) => item.id === user);
      list !== docListener && setDocListener(list[0]);
    });
  }, []);

  useEffect(() => {
    if (cardItem && docListener) {
      setFavoritesList(docListener[type]);
    }
  }, [docListener]);

  useEffect(() => {
    if (favoritesList) {
      favoritesList.includes(cardItem.id)
        ? setIsFavorite(true)
        : setIsFavorite(false);
    }
  }, [docListener, favoritesList]);

  const handleClick = (e) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      if (docListener !== 0) {
        if (typeof docListener === 'object') {
          return updateFavorites(cardItem.id, user, type);
        }
        return addFavorites(cardItem.id, user, type);
      }
    } else {
      return removeFavorites(cardItem.id, user, type);
    }
  };

  const cardContent = () => {
    const {
      id,
      image,
      episode,
      type: locationType,
      dimension,
      air_date: date,
    } = cardItem;
    if (image) {
      return <img src={image} alt={`logo cardItem #${id}`} />;
    }
    if (episode) {
      return (
        <>
          <p>
            <strong>Episode:</strong> {episode}
          </p>
          <p>
            <strong>Air Date:</strong> {date}
          </p>
        </>
      );
    }
    return (
      <>
        <p>
          <strong>Type:</strong> {locationType}
        </p>
        <p>
          <strong>Dimension:</strong> {dimension}
        </p>
      </>
    );
  };

  const handlePokeInfo = () => {
    if (cardItem) {
      const { name, id, image } = cardItem;
      return (
        <Link
          className='card container'
          to={`${type}/${id}`}
          state={{ cardItem, isFavorite }}
        >
          <div className='card__title'>
            <h5>
              #{id} - {name}
            </h5>
            <Button
              name={id}
              onClick={(e) => {
                handleClick(e);
              }}
            >
              <Icon name={id}>
                {isFavorite ? 'favorite' : 'favorite_border'}
              </Icon>
            </Button>
          </div>
          <div className={`card__body ${image ? '' : 'text-left'}`}>
            {cardContent()}
          </div>
        </Link>
      );
    }
    return null;
  };
  return handlePokeInfo();
}

Card.propTypes = {
  cardItem: PropTypes.object.isRequired,
  user: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
