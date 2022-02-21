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
  console.log({ currentState }, 'before')
  currentState.push(data)
  console.log({ currentState }, 'after')
  try {
    dispatch({
      type: currentState,
      payload: data,
    })
  } catch (err) {
    console.error(err)
  }
}
