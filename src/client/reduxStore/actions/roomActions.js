import * as ACTIONS from './actionTypes';

export const changeRoom = (roomID) => {
  return (dispatch) => {
    dispatch({ type: ACTIONS.CHANGE_ROOM, payload: roomID });
  }
}
