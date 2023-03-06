import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import PropTypes from 'prop-types'

import './Filters.scss'
import ButtonComponent from '../Button'
import FilterCharacter from '../../redux/actions/FilterActions'

const filtersArr = {
  character: [
    'name',
    {
      status: ['alive', 'dead', 'unknown'],
    },
    {
      gender: ['female', 'male', 'genderless', 'unknown'],
    },
  ],
  location: ['name', 'type', 'dimension'],
  episode: ['name', 'episode'],
}

function Filters({ type }) {
  const dispatch = useDispatch()
  const [filterValues, setFilterValues] = useState({
    name: '',
    status: '',
    gender: '',
    type: '',
    dimension: '',
    episode: '',
  })

  const handleChange = ({ name, value }) => {
    setFilterValues({
      ...filterValues,
      [name]: value,
    })
  }

  const handleFilter = () => {
    const toDispatch = {
      character: FilterCharacter(filterValues),
    }
    console.log(filterValues)
    dispatch(toDispatch[type])
  }

  const renderFilterType = () => {
    const filters = filtersArr[type]
    return filters.map((filter) => {
      if (typeof filter !== 'object') {
        return (
          <input
            name={filter}
            key={filter}
            type='text'
            className='login__textBox'
            value={filterValues[filter]}
            onChange={({ target }) => handleChange(target)}
            placeholder={filter}
          />
        )
      }
      return (
        <select
          name={Object.keys(filter)[0]}
          key={Object.keys(filter)[0]}
          onChange={({ target }) => handleChange(target)}
        >
          <option disabled selected hidden>
            {Object.keys(filter)[0]}
          </option>
          {Object.values(filter)[0].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )
    })
  }
  return (
    <div className='filters-container'>
      {renderFilterType()}
      <ButtonComponent text='Filter' action={() => handleFilter()} />
    </div>
  )
}

Filters.propTypes = {
  type: PropTypes.string.isRequired,
}

export default Filters
