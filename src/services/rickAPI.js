import axios from 'axios';

const urlBase = 'https://rickandmortyapi.com/api';

export const getCharactersList = (page = 1) => {
  const url = `${urlBase}/character/?page=${page}`;

  return axios({
    method: 'GET',
    url,
  });
};

export const getLocationsList = (page = 1) => {
  const url = `${urlBase}/location/?page=${page}`;
  return axios({
    method: 'GET',
    url,
  });
};

export const getEpisodesList = (page = 1) => {
  const url = `${urlBase}/episode/?page=${page}`;
  return axios({
    method: 'GET',
    url,
  });
};
