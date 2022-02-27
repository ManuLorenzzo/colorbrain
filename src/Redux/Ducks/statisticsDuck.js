// constantes
const initialData = []

// types
const SET_STATISTICS_SUCCESS = 'SET_STATISTICS_SUCCESS'

// reducer
export default function statisticsReducer(state = initialData, action) {
  switch (action.type) {
    case SET_STATISTICS_SUCCESS:
      return action.payload
    default:
      return state
  }
}

// actions

export const addReduxStatistics = data => (dispatch, getState) => {
  let currentState = getState()?.statistics
  currentState.push(data)
  try {
    dispatch({
      type: currentState,
      payload: data,
    })
  } catch (err) {
    console.error(err)
  }
}

export const setReduxStatistics = data => dispatch => {
  try {
    dispatch({
      type: SET_STATISTICS_SUCCESS,
      payload: data,
    })
  } catch (err) {
    console.error(err)
  }
}
