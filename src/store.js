import { createStore,combineReducers } from 'redux'
import loggedUserReducer from './reducers/loggedUserReducers'

const reducers = combineReducers({
    loggedUserState: loggedUserReducer
})

const store = createStore(reducers)

export default store