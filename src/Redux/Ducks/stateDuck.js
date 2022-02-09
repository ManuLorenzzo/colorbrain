// constantes
const initialData = {
  inputValues: [],
  tests: [],
  testSelected: 0,
  keyboard: [],
}

// types
const SET_INPUT_VALUES_SUCCESS = 'SET_INPUT_VALUES_SUCCESS'
const SET_TESTS_SUCCESS = 'SET_TESTS_SUCCESS'
const SET_TESTS_SELECTED_SUCCESS = 'SET_TESTS_SELECTED_SUCCESS'

// reducer
export default function stateReducer(state = initialData, action) {
  switch (action.type) {
    case SET_INPUT_VALUES_SUCCESS:
      return { ...state, inputValues: action.payload }
    case SET_TESTS_SUCCESS:
      return { ...state, tests: action.payload }
    case SET_TESTS_SELECTED_SUCCESS:
      return { ...state, testSelected: action.payload }
    default:
      return state
  }
}

// actions

export const setReduxInputValues = data => dispatch => {
  try {
    dispatch({
      type: SET_INPUT_VALUES_SUCCESS,
      payload: data,
    })
  } catch (err) {
    console.error(err)
  }
}

export const setReduxTests = data => dispatch => {
  try {
    dispatch({
      type: SET_TESTS_SUCCESS,
      payload: data,
    })
  } catch (err) {
    console.error(err)
  }
}

export const setReduxTestSelected = data => dispatch => {
  try {
    dispatch({
      type: SET_TESTS_SELECTED_SUCCESS,
      payload: data,
    })
  } catch (err) {
    console.error(err)
  }
}
