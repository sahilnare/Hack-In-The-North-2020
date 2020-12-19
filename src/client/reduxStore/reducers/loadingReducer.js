
import * as ACTIONS from '../actions/actionTypes';

const initState = {
  deviceSupported: true,
  agoraLoading: false
}

const loadingReducer = (state = initState, action) => {

  if(action.type === ACTIONS.USER_DEVICE) {
    return {
      ...state,
      deviceSupported: action.payload
    }
  }

  if(action.type === ACTIONS.AGORA_LOADING_ON) {
    return {
      ...state,
      agoraLoading: true
    }
  }

  if(action.type === ACTIONS.AGORA_LOADING_OFF) {
    return {
      ...state,
      agoraLoading: false
    }
  }

  else {
    return state;
  }
}

export default loadingReducer;
