
import * as ACTIONS from '../actions/actionTypes';

const initState = {
  isRoomSelected: false,
  currentRoomId: ''
}

const authReducer = (state = initState, action) => {

  if(action.type === ACTIONS.CHANGE_ROOM) {
    return {
      ...state,
      isRoomSelected: true,
      currentRoomId: action.payload
    }
  }

  else {
    return state;
  }
}

export default authReducer;
