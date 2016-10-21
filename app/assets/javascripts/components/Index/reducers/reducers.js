import * as ACTION from '../actions';
import { DEFAULT_STATE } from './ConstValue';

export function locale(locale = DEFAULT_STATE.locale, action) {
  switch (action.type) {
    case ACTION.SET_LOCALE:
      return action.locale
    default:
      return locale;
  }
}

export function csrf(csrf = DEFAULT_STATE.csrf, action) {
  switch (action.type) {
    default:
      return csrf;
  }
}

export function currentUser(currentUser = DEFAULT_STATE.currentUser, action) {
  switch (action.type) {
    case ACTION.SET_CURRENT_USER:
      return action.currentUser
    default:
      return currentUser;
  }
}

export function isUserSignIn(isUserSignIn = DEFAULT_STATE.isUserSignIn, action) {
  switch (action.type) {
    case ACTION.SET_IS_SIGN_IN:
      return action.isUserSignIn
    default:
      return isUserSignIn;
  }
}
