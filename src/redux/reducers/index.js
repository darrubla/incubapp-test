import { combineReducers } from 'redux';

import Auth from './AuthReducers';
import Home from './HomeReducers';

export default combineReducers({
  Auth,
  Home,
});
