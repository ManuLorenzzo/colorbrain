// constantes
const initialData = {
  inputValues: [null, null, null, null],
  tests: [],
  selectedTest: 0,
  selectedBubble: 0,
  scrollTo: null,
  showStatistics: false,
}

// types
const SET_STATE_SUCCESS = 'SET_STATE_SUCCESS'
const SET_INPUT_VALUES_SUCCESS = 'SET_INPUT_VALUES_SUCCESS'
const SET_TESTS_SUCCESS = 'SET_TESTS_SUCCESS'
const SET_SELECTED_TESTS_SUCCESS = 'SET_SELECTED_TESTS_SUCCESS'
const SET_SELECTED_BUBBLE_SUCCESS = 'SET_SELECTED_BUBBLE_SUCCESS'
const SET_SCROLL_TO_SUCCESS = 'SET_SCROLL_TO_SUCCESS'
const SET_SHOW_STATISTICS_SUCCESS = 'SET_SHOW_STATISTICS_SUCCESS'

// reducer
export default function stateReducer(state = initialData, action) {
  switch (action.type) {
    case SET_STATE_SUCCESS:
      return action.payload
    case SET_INPUT_VALUES_SUCCESS:
      return { ...state, inputValues: action.payload }
    case SET_TESTS_SUCCESS:
      return { ...state, tests: action.payload }
    case SET_SELECTED_TESTS_SUCCESS:
      return { ...state, selectedTest: action.payload }
    case SET_SELECTED_BUBBLE_SUCCESS:
      return { ...state, selectedBubble: action.payload }
    case SET_SCROLL_TO_SUCCESS:
      return { ...state, scrollTo: action.payload }
    case SET_SHOW_STATISTICS_SUCCESS:
      return { ...state, showStatistics: action.payload }

    default:
      return state
  }
}

// actions

export const setReduxState = data => dispatch => {
  try {
    dispatch({
      type: SET_STATE_SUCCESS,
      payload: data,
    })
  } catch (err) {
    console.error(err)
  }
}

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

export const setReduxSelectedTest = data => dispatch => {
  try {
    dispatch({
      type: SET_SELECTED_TESTS_SUCCESS,
      payload: data,
    })
  } catch (err) {
    console.error(err)
  }
}

export const setReduxSelectedBubble = data => dispatch => {
  try {
    dispatch({
      type: SET_SELECTED_BUBBLE_SUCCESS,
      payload: data,
    })
  } catch (err) {
    console.error(err)
  }
}

export const setReduxScrollTo = data => dispatch => {
  try {
    dispatch({
      type: SET_SCROLL_TO_SUCCESS,
      payload: data,
    })
  } catch (err) {
    console.error(err)
  }
}

export const setReduxShowStatistics = data => dispatch => {
  try {
    dispatch({
      type: SET_SHOW_STATISTICS_SUCCESS,
      payload: data,
    })
  } catch (err) {
    console.error(err)
  }
}
