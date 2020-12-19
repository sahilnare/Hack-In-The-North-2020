
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import roomReducer from './roomReducer';
import loadingReducer from './loadingReducer';

const appReducer = combineReducers({
  auth: authReducer,
  userQuery: userReducer,
  room: roomReducer,
  loading: loadingReducer
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === 'CLEAR_REDUX') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
