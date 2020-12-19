
import * as ACTIONS from './actionTypes';
import axios from 'axios';

export const logInUser = (cred, loginCallback) => {

  return (dispatch) => {

    axios.post('/api/userAuth/login', cred, {
      headers: {
        "Content-Type": "application/json"
      }

    }).then(res => {
      localStorage.setItem("token", res.data.cred.token);

      dispatch({ type: ACTIONS.LOGIN_SUCCESS, payload: res.data.cred.user });
      loginCallback();

    }).catch(err => {
      if(err.response.status === 401) {
        dispatch({ type: ACTIONS.LOGIN_ERR, payload: err.response.data });
      } else {
        dispatch({ type: ACTIONS.LOGIN_ERR, payload: 'There was some error, please try again.' });
      }
    });
  }
}

export const signUpUser = (cred, signupCallback) => {
  return (dispatch) => {

    axios.post('/api/userAuth/register', cred, {
      headers: {
        "Content-Type": "application/json"
      }

    }).then(res => {

      console.log(res.data.cred);

      localStorage.setItem("token", res.data.cred.token);

      dispatch({ type: ACTIONS.SIGNUP_SUCCESS, payload: res.data.cred.user });
      signupCallback();

    }).catch(err => {
      if(err.response.status === 401) {
        dispatch({ type: ACTIONS.SIGNUP_ERR, payload: err.response.data });
      } else {
        dispatch({ type: ACTIONS.SIGNUP_ERR, payload: 'There was some error, please try again.' });
      }
    });

  }
}

export const isLoggedIn = () => {
  return (dispatch) => {
    const token = localStorage.token;

    axios.get('/api/userAuth/verify', {
      headers: {
        "Content-Type": "application/json",
        token: token
      }
    }).then(res => {
      console.log("Already logged in");
      // console.log(res.data.userAgent);
      dispatch({ type: ACTIONS.LOGIN_SUCCESS, payload: res.data.cred.user });

    }).catch(err => {
      // console.error(err);
      dispatch({ type: ACTIONS.LOGIN_ERR });
    });

    axios.get('/api/userAuth/getuseragent', {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if(res.data.isMobile || res.data.isAndroid || res.data.isiPhone || res.data.isAndroidTablet || res.data.isMobileNative) {
        console.log("Sorry your device is not supported");
        dispatch({ type: ACTIONS.USER_DEVICE, payload: false });
      }
      else {
        dispatch({ type: ACTIONS.USER_DEVICE, payload: true });
        console.log("Your device is supported");
      }
    }).catch(err => {
      console.log(err);
    })
  }
}

export const logOut = () => {
  return (dispatch) => {
    const token = localStorage.token;
    axios.get('/api/userAuth/logout', {
      headers: {
        "Content-Type": "application/json",
        token: token
      }
    }).then(res => {
      dispatch({ type: ACTIONS.LOGOUT_SUCCESS });
      localStorage.removeItem("token");
      dispatch({ type: ACTIONS.CLEAR_REDUX });

    }).catch(err => {
      console.log(err);
    });

  }
}

export const isOnline = () => {
  return (dispatch) => {
    const token = localStorage.token;
    axios.get('/api/userAuth/isOnline', {
      headers: {
        "Content-Type": "application/json",
        token: token
      }
    }).then(res => {

      // console.log(res.data);

    }).catch(err => {
      console.log(err);
    });

  }
}
