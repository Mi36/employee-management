//this is action creator
//this is get called from components

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
} from './types';
import auth from '@react-native-firebase/auth';
import * as RootNavigation from '../navigationRef';

export const emailChange = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text,
  };
};
export const passwordChange = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text,
  };
};

export const loginUser = ({email, password}) => {
  return (dispatch) => {
    dispatch({type: LOGIN_USER});

    auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: user,
        });
        RootNavigation.navigate('Employee List');
      })
      .catch((error) => {
        console.log(error);
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then((user) => {
            dispatch({type: LOGIN_USER_SUCCESS, payload: user});
            RootNavigation.navigate('Employee List');
          })
          .catch(() => {
            dispatch({type: LOGIN_USER_FAIL});
          });
      });
  };
};
