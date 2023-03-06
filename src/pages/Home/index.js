import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { connect, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { Container } from '@mui/material'
import ButtonComponent from '../../components/Button'
import LoaderComponent from '../../components/Loader'
import Card from '../../components/Card'

import {
  GetCharactersList,
  GetLocationsList,
  GetEpisodesList,
} from '../../redux/actions/HomeActions'
import { auth } from '../../services/firebase'

import './Home.scss'
import Filters from '../../components/Filters'

function Home({
  isloading,
  charactersList,
  locationsList,
  episodesList,
  type,
}) {
  const dispatch = useDispatch()
  const [user] = useAuthState(auth)
  const [listado, setListado] = useState(null)
  const [info, setInfo] = useState(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const toDispatch = {
      character: GetCharactersList(page),
      location: GetLocationsList(page),
      episode: GetEpisodesList(page),
    }
    dispatch(toDispatch[type])
  }, [page])

  useEffect(() => {
    if (charactersList?.results) {
      setListado(charactersList.results)
      setInfo(charactersList.info)
    }
  }, [charactersList])

  useEffect(() => {
    if (locationsList?.results) {
      setListado(locationsList.results)
      setInfo(locationsList.info)
    }
  }, [locationsList])

  useEffect(() => {
    if (episodesList?.results) {
      setListado(episodesList.results)
      setInfo(episodesList.info)
    }
  }, [episodesList])

  const handleListado = () => {
    if (listado && user) {
      return listado.map((cardItem) => (
        <Card
          user={user.email}
          key={cardItem.id}
          cardItem={cardItem}
          type={type}
        />
      ))
    }
    return null
  }

  const handleClick = ({ name }) => {
    if (name === 'next') return setPage(page + 1)
    return setPage(page - 1)
  }

  return (
    <Container>
      <LoaderComponent show={isloading} />
      <main>
        <Filters type={type} />
        <section className='home'>{user && handleListado()}</section>
      </main>
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
  )
}

Home.propTypes = {
  isloading: PropTypes.bool.isRequired,
  charactersList: PropTypes.object.isRequired,
  locationsList: PropTypes.object.isRequired,
  episodesList: PropTypes.object.isRequired,
  type: PropTypes.string,
}

Home.defaultProps = {
  type: 'character',
}

function mapStateToProps({
  Home: {
    charactersList,
    charactersListIsLoading,
    locationsList,
    locationsListIsLoading,
    episodesList,
    episodesListIsLoading,
  },
}) {
  return {
    isloading:
      charactersListIsLoading ||
      locationsListIsLoading ||
      episodesListIsLoading,
    charactersList,
    locationsList,
    episodesList,
  }
}

export default connect(mapStateToProps)(Home)
