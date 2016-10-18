import * as ACTION from '../actions';
import { DEFAULT_STATE } from './ConstValue';


export function locale(locale = DEFAULT_STATE.locale, action) {
  switch (action.type) {
    default:
      return locale;
  }
}
