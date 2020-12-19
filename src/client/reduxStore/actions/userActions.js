
import * as ACTIONS from './actionTypes';
import axios from 'axios';


export const sendRequest = (requester, recipient, user) => {
  return (dispatch) => {
    const token = localStorage.token;
    axios.post('/api/connect/friendrequest',{requester, recipient}, {
      headers: {
        "Content-Type": "application/json",
        token: token
      }

    }).then(res => {
      console.log(res.data);
      dispatch({ type: ACTIONS.SEND_REQUEST, payload: user });

    }).catch(err => {
      console.error(err);
    });

  }
}

export const acceptRequest = (requester, recipient, user) => {
  return (dispatch) => {
    const token = localStorage.token;
    axios.post('/api/connect/friendaccept',{requester, recipient}, {
      headers: {
        "Content-Type": "application/json",
        token: token
      }

    }).then(res => {
      console.log(res.data);
      console.log(user);
      dispatch({ type: ACTIONS.FRIEND_ACCEPT, payload: user });

    }).catch(err => {
      console.error(err);
    });

  }
}

export const rejectRequest = (requester, recipient, user) => {
  return (dispatch) => {
    const token = localStorage.token;
    axios.post('/api/connect/friendreject',{requester, recipient}, {
      headers: {
        "Content-Type": "application/json",
        token: token
      }

    }).then(res => {
      console.log(res.data);
      dispatch({ type: ACTIONS.FRIEND_REJECT, payload: user });

    }).catch(err => {
      console.error(err);
    });

  }
}

export const searchUser = (search, userId) => {
  return (dispatch) => {
    const token = localStorage.token;
    axios.post('/api/userData/searchuser', search, {
      headers: {
        "Content-Type": "application/json",
        token: token
      }

    }).then(res => {
      // console.log(res.data);
      const finalRes = res.data.filter(item => item._id != userId);
      dispatch({ type: ACTIONS.SEARCH_RESULT, payload: finalRes });

    }).catch(err => {
      console.error(err);
    });

  }
}

export const clearSearch = () => {
  return (dispatch) => {
    dispatch({ type: ACTIONS.CLEAR_SEARCH });
  }
}

export const getAllFriends = () => {
  return (dispatch) => {
    const token = localStorage.token;
    axios.get('/api/userData/getallfriends', {
      headers: {
        "Content-Type": "application/json",
        token: token
      }

    }).then(res => {
      // console.log(res.data);
      dispatch({ type: ACTIONS.GET_FRIENDS, payload: res.data.friendsData });

    }).catch(err => {
      console.error(err);
    });

  }
}

export const friendOnline = (id, isOnline) => {
  return (dispatch) => {
    let friend = {
      id: id,
      isOnline: isOnline
    };
    dispatch({ type: ACTIONS.FRIEND_ONLINE, payload: friend });
  }
}

export const waitlist = (cred) => {
  return (dispatch) => {
    axios.post('/api/userData/waitlist', cred, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      console.log(res.data);
      dispatch({ type: ACTIONS.SENT_TO_WAITLIST });

    }).catch(err => {
      console.error(err);
    });

  }
}
