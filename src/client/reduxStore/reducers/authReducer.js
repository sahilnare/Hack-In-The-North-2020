
import * as ACTIONS from '../actions/actionTypes';

const initState = {
  isAuthenticated: false,
  userData: null,
  token: null,
  loginError: null,
  signupError: null
}

const authReducer = (state = initState, action) => {

  if(action.type === ACTIONS.LOGIN_SUCCESS) {
    return {
      ...state,
      isAuthenticated: true,
      userData: action.payload,
      loginError: null
    }
  }

  else if(action.type === ACTIONS.LOGIN_ERR) {
    return {
      ...state,
      isAuthenticated: false,
      token: null,
      loginError: action.payload
    }
  }

  if(action.type === ACTIONS.SIGNUP_SUCCESS) {
    return {
      ...state,
      isAuthenticated: true,
      userData: action.payload,
      signupError: null
    }
  }

  else if(action.type === ACTIONS.SIGNUP_ERR) {
    return {
      ...state,
      isAuthenticated: false,
      token: null,
      signupError: action.payload
    }
  }

  else if(action.type === ACTIONS.LOGOUT_SUCCESS) {
    return {
      ...state,
      isAuthenticated: false,
      token: null,
      loginError: null,
      signupError: null
    }
  }

  else {
    return state;
  }
}

export default authReducer;
