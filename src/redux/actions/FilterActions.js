import {
  handleActionCatch,
  validateServerResponse,
} from '../../utils/errorUtils'
import {
  FILTER_CHARACTERS_STARTED,
  FILTER_CHARACTERS_SUCCESS,
  FILTER_CHARACTERS_FAILED,
  CLEAR_CHARACTERS_FILTER,
} from '../constants'

import { filter } from '../../services/rickAPI'

export const FilterCharacterStarted = () => ({
  type: FILTER_CHARACTERS_STARTED,
})

export const FilterCharacterSuccess = (payload) => ({
  type: FILTER_CHARACTERS_SUCCESS,
  payload,
})

export const FilterCharacterFailed = (payload) => ({
  type: FILTER_CHARACTERS_FAILED,
  payload,
})

export const ClearFilter = () => ({ type: CLEAR_CHARACTERS_FILTER })

const FilterCharacter = (filters) => async (dispatch) => {
  dispatch(FilterCharacterStarted())
  try {
    const result = await filter(filters, 'character')
    validateServerResponse(result)
    dispatch(FilterCharacterSuccess(result.data))
  } catch (error) {
    handleActionCatch(
      error,
      dispatch,
      FilterCharacterFailed,
      'Filter Character'
    )
  }
}

export default FilterCharacter
