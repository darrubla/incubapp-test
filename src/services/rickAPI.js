import axios from 'axios'

const urlBase = 'https://rickandmortyapi.com/api'

export const getCharacterListado = (page = 1) => {
  const url = `${urlBase}/character/?page=${page}`

  return axios({
    method: 'GET',
    url,
  })
}
