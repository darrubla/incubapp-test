import notify from '../../utils/notifyToast';
import {
  handleActionCatch,
  validateServerResponse,
} from '../../utils/errorUtils';
import {
  GET_CHARACTERS_LIST_STARTED,
  GET_CHARACTERS_LIST_SUCCESS,
  GET_CHARACTERS_LIST_FAILED,
  GET_LOCATIONS_LIST_STARTED,
  GET_LOCATIONS_LIST_SUCCESS,
  GET_LOCATIONS_LIST_FAILED,
  GET_EPISODES_LIST_STARTED,
  GET_EPISODES_LIST_SUCCESS,
  GET_EPISODES_LIST_FAILED,
} from '../constants';

import {
  getCharactersList,
  getLocationsList,
  getEpisodesList,
} from '../../services/rickAPI';

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

export const GetLocationsListStarted = () => ({
  type: GET_LOCATIONS_LIST_STARTED,
});

export const GetLocationsListSuccess = (payload) => ({
  type: GET_LOCATIONS_LIST_SUCCESS,
  payload,
});

export const GetLocationsListFailed = (payload) => ({
  type: GET_LOCATIONS_LIST_FAILED,
  payload,
});

export const GetEpisodesListStarted = () => ({
  type: GET_EPISODES_LIST_STARTED,
});

export const GetEpisodesListSuccess = (payload) => ({
  type: GET_EPISODES_LIST_SUCCESS,
  payload,
});

export const GetEpisodesListFailed = (payload) => ({
  type: GET_EPISODES_LIST_FAILED,
  payload,
});

const GetCharactersList = (page) => async (dispatch) => {
  dispatch(GetCharactersListStarted());
  try {
    const result = await getCharactersList(page);

    validateServerResponse(result);
    dispatch(GetCharactersListSuccess(result.data));
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

const GetLocationsList = (page) => async (dispatch) => {
  dispatch(GetLocationsListStarted());
  try {
    const result = await getLocationsList(page);

    validateServerResponse(result);
    dispatch(GetLocationsListSuccess(result.data));
  } catch (error) {
    notify(
      'error',
      '¡Upps, parece que la base de datos de la pokedex está en actualización, prueba más tarde!',
      'getListadoError'
    );
    handleActionCatch(
      error,
      dispatch,
      GetLocationsListFailed,
      'Get Locations List'
    );
  }
};

const GetEpisodesList = (page) => async (dispatch) => {
  dispatch(GetEpisodesListStarted());
  try {
    const result = await getEpisodesList(page);

    validateServerResponse(result);
    dispatch(GetEpisodesListSuccess(result.data));
  } catch (error) {
    notify(
      'error',
      '¡Upps, parece que la base de datos de la pokedex está en actualización, prueba más tarde!',
      'getListadoError'
    );
    handleActionCatch(
      error,
      dispatch,
      GetEpisodesListFailed,
      'Get Episodes List'
    );
  }
};

export { GetCharactersList, GetLocationsList, GetEpisodesList };
