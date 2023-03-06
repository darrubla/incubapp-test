/* eslint-disable default-param-last */
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

const initialStateGetCharactersList = {
  charactersList: [],
  charactersListSuccess: false,
  charactersListFailed: false,
  charactersListIsLoading: false,
  charactersListError: '',
};

const initialStateGetLocationsList = {
  locationsList: [],
  locationsListSuccess: false,
  locationsListFailed: false,
  locationsListIsLoading: false,
  locationsListError: '',
};

const initialStateGetEpisodesList = {
  episodesList: [],
  episodesListSuccess: false,
  episodesListFailed: false,
  episodesListIsLoading: false,
  episodesListError: '',
};

export const initialState = {
  ...initialStateGetCharactersList,
  ...initialStateGetLocationsList,
  ...initialStateGetEpisodesList,
};

export const HomeReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CHARACTERS_LIST_STARTED: {
      return {
        ...state,
        ...initialStateGetCharactersList,
        charactersListIsLoading: true,
      };
    }
    case GET_CHARACTERS_LIST_SUCCESS: {
      return {
        ...state,
        ...initialStateGetCharactersList,
        charactersList: payload,
        charactersListSuccess: true,
        charactersListIsLoading: false,
      };
    }
    case GET_CHARACTERS_LIST_FAILED: {
      return {
        ...state,
        ...initialStateGetCharactersList,
        charactersListFailed: true,
        charactersListIsLoading: false,
        charactersListError: payload,
      };
    }
    case GET_LOCATIONS_LIST_STARTED: {
      return {
        ...state,
        ...initialStateGetLocationsList,
        locationsListIsLoading: true,
      };
    }
    case GET_LOCATIONS_LIST_SUCCESS: {
      return {
        ...state,
        ...initialStateGetLocationsList,
        locationsList: payload,
        locationsListSuccess: true,
        locationsListIsLoading: false,
      };
    }
    case GET_LOCATIONS_LIST_FAILED: {
      return {
        ...state,
        ...initialStateGetLocationsList,
        locationsListFailed: true,
        locationsListIsLoading: false,
        locationsListError: payload,
      };
    }
    case GET_EPISODES_LIST_STARTED: {
      return {
        ...state,
        ...initialStateGetEpisodesList,
        episodesListIsLoading: true,
      };
    }
    case GET_EPISODES_LIST_SUCCESS: {
      return {
        ...state,
        ...initialStateGetEpisodesList,
        episodesList: payload,
        episodesListSuccess: true,
        episodesListIsLoading: false,
      };
    }
    case GET_EPISODES_LIST_FAILED: {
      return {
        ...state,
        ...initialStateGetEpisodesList,
        episodesListFailed: true,
        episodesListIsLoading: false,
        episodesListError: payload,
      };
    }
    default:
      return state;
  }
};

export default HomeReducer;
