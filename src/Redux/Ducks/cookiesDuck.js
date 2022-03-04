// constantes
const initialData = {
  showPolicyModal: false,
  showModal: false,
  data: {},
}

// types
const SET_SHOW_POLICY_MODAL_SUCCESS = 'SET_SHOW_POLICY_MODAL_SUCCESS'
const SET_SHOW_MODAL_SUCCESS = 'SET_SHOW_MODAL_SUCCESS'
const SET_DATA_SUCCESS = 'SET_DATA_SUCCESS'

// reducer
export default function cookiesReducer(state = initialData, action) {
  switch (action.type) {
    case SET_SHOW_POLICY_MODAL_SUCCESS:
      return { ...state, showPolicyModal: action.payload }
    case SET_SHOW_MODAL_SUCCESS:
      return { ...state, showModal: action.payload }
    case SET_DATA_SUCCESS:
      return { ...state, data: action.payload }
    default:
      return state
  }
}

// actions

export const setReduxShowPolicyModal = data => dispatch => {
  try {
    dispatch({
      type: SET_SHOW_POLICY_MODAL_SUCCESS,
      payload: data,
    })
  } catch (err) {
    console.error(err)
  }
}

export const setReduxShowCookiesModal = data => dispatch => {
  try {
    dispatch({
      type: SET_SHOW_MODAL_SUCCESS,
      payload: data,
    })
  } catch (err) {
    console.error(err)
  }
}

export const setReduxCookieData = data => dispatch => {
  try {
    dispatch({
      type: SET_DATA_SUCCESS,
      payload: data,
    })
  } catch (err) {
    console.error(err)
  }
}
