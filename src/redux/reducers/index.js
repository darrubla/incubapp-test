import { combineReducers } from 'redux'

import Auth from './AuthReducers'
import Home from './HomeReducers'
import Filter from './FilterReducers'

export default combineReducers({
  Auth,
  Home,
  Filter,
})
