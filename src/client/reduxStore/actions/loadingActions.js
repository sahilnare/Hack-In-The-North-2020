import * as ACTIONS from './actionTypes';

export const agoraLoadingOn = () => {
  return (dispatch) => {
    dispatch({ type: ACTIONS.AGORA_LOADING_ON });
  }
}

export const agoraLoadingOff = () => {
  return (dispatch) => {
    dispatch({ type: ACTIONS.AGORA_LOADING_OFF });
  }
}
