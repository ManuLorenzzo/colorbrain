import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import stateReducer from './Ducks/stateDuck'
import statisticsReducer from './Ducks/statisticsDuck'

const allReducers = combineReducers({
  state: stateReducer,
  statistics: statisticsReducer,
})

const rootReducer = (state, action) => {
  return allReducers(state, action)
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function generateStore() {
  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
  return store
}
