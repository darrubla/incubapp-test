/* eslint-disable default-param-last */
import {
  FILTER_CHARACTERS_STARTED,
  FILTER_CHARACTERS_SUCCESS,
  FILTER_CHARACTERS_FAILED,
  CLEAR_CHARACTERS_FILTER,
} from '../constants'

const initialStateFilter = {
  filterCharacter: {},
  filterCharacterSuccess: false,
  filterCharacterFailed: false,
  filterCharacterIsLoading: false,
  filterCharacterError: '',
}

export const initialState = {
  ...initialStateFilter,
}

export const FilterCharacterReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case FILTER_CHARACTERS_STARTED: {
      return {
        ...state,
        ...initialStateFilter,
        filterCharacterIsLoading: true,
      }
    }
    case FILTER_CHARACTERS_SUCCESS: {
      return {
        ...state,
        ...initialStateFilter,
        filterCharacter: payload,
        filterCharacterSuccess: true,
        filterCharacterIsLoading: false,
      }
    }
    case FILTER_CHARACTERS_FAILED: {
      return {
        ...state,
        ...initialStateFilter,
        filterCharacterFailed: true,
        filterCharacterIsLoading: false,
        filterCharacterError: payload,
      }
    }
    case CLEAR_CHARACTERS_FILTER: {
      return {
        ...state,
        ...initialStateFilter,
      }
    }
    default:
      return state
  }
}

export default FilterCharacterReducer
