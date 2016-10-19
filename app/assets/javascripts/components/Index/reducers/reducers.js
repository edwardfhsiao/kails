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
