import axios from 'axios'

const urlBase = 'https://rickandmortyapi.com/api'

export const getList = (type, page = 1) => {
  const url = `${urlBase}/${type}/?page=${page}`

  return axios({
    method: 'GET',
    url,
  })
}

export const filter = (filters, filterType) => {
  const { name, status, episode, dimension, gender, type } = filters
  const typeFilters = {
    character: `${urlBase}/character/?name=${name}&status=${status}&gender=${gender}`,
    location: `${urlBase}/location/?name=${name}&type=${type}&dimension=${dimension}`,
    episode: `${urlBase}/location/?name=${name}&episode=${episode}`,
  }
  const url = typeFilters[filterType]
  return axios({
    method: 'GET',
    url,
  })
}
