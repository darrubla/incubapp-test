import notify from '../../utils/notifyToast';
import {
  handleActionCatch,
  validateServerResponse,
} from '../../utils/errorUtils';
import {
  GET_CHARACTERS_LIST_STARTED,
  GET_CHARACTERS_LIST_SUCCESS,
  GET_CHARACTERS_LIST_FAILED,
} from '../constants';

import { getCharactersList } from '../../services/rickAPI';

export const GetCharactersListStarted = () => ({
  type: GET_CHARACTERS_LIST_STARTED,
});

export const GetCharactersListSuccess = (payload) => ({
  type: GET_CHARACTERS_LIST_SUCCESS,
  payload,
});

export const GetCharactersListFailed = (payload) => ({
  type: GET_CHARACTERS_LIST_FAILED,
  payload,
});

const GetCharactersList = (page) => async (dispatch) => {
  dispatch(GetCharactersListStarted());
  try {
    const result = await getCharactersList(page);
    console.log(result.data.results);

    validateServerResponse(result);
    dispatch(GetCharactersListSuccess(result.data.results));
  } catch (error) {
    notify(
      'error',
      '¡Upps, parece que la base de datos de la pokedex está en actualización, prueba más tarde!',
      'getListadoError'
    );
    handleActionCatch(
      error,
      dispatch,
      GetCharactersListFailed,
      'Get Characters List'
    );
  }
};

export default GetCharactersList;
