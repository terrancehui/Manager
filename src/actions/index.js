import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL } from './types';
import firebase from 'firebase';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  }
}

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  }
}

export const loginUser = ( { email, password } ) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER })
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then (user => LoginUserSuccess(dispatch, user))
      .catch (() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => LoginUserSuccess(dispatch, user))
          .catch(() => LoginUserFail(dispatch))
      }) 
  };
}

const LoginUserFail = (dispatch) => {
  dispatch({
    type: LOGIN_USER_FAIL })
}

const LoginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS, 
    payload: user
  })
}