import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import loggedUserReducer from './loggedUserReducers'

export default combineReducers({
    routing: routerReducer,
    loggedUserState: loggedUserReducer
})