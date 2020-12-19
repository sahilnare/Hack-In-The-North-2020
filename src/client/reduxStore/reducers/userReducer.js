
import * as ACTIONS from '../actions/actionTypes';

const initState = {
  friends: [],
  pending: [],
  requests: [],
  usersFound: [],
  waitlistSent: false
}

const userReducer = (state = initState, action) => {

  if(action.type === ACTIONS.SEARCH_RESULT) {
    return {
      ...state,
      usersFound: action.payload
    }
  }

  if(action.type === ACTIONS.CLEAR_SEARCH) {
    return {
      ...state,
      usersFound: []
    }
  }

  if(action.type === ACTIONS.GET_FRIENDS) {
    return {
      ...state,
      friends: action.payload.friends,
      pending: action.payload.pending,
      requests: action.payload.requests
    }
  }

  if(action.type === ACTIONS.SEND_REQUEST) {
    return {
      ...state,
      pending: [...state.pending, action.payload]
    }
  }

  if(action.type === ACTIONS.FRIEND_ACCEPT) {
    return {
      ...state,
      friends: [...state.friends, action.payload],
      requests: state.requests.filter(user => user._id !== action.payload._id)
    }
  }

  if(action.type === ACTIONS.FRIEND_REJECT) {
    return {
      ...state,
      requests: state.requests.filter(user => user._id !== action.payload._id)
    }
  }

  if(action.type === ACTIONS.FRIEND_ONLINE) {
    return {
      ...state,
      friends: state.friends.map(friend => {
        if(friend._id === action.payload.id) {
          return {
            ...friend,
            isOnline: action.payload.isOnline
          }
        }
        else {
          return friend;
        }
      })
    }
  }

  if(action.type === ACTIONS.SENT_TO_WAITLIST) {
    return {
      ...state,
      waitlistSent: true
    }
  }

  else {
    return state;
  }
}

export default userReducer;
