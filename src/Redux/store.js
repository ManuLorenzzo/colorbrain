import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import stateReducer from './Ducks/stateDuck'

const allReducers = combineReducers({
  state: stateReducer,
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined
  }

  return allReducers(state, action)
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function generateStore() {
  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
  return store
}
