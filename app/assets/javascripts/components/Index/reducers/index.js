import { combineReducers } from 'redux';
import * as REDUCERS from './reducers';
import objectAssign from 'object-assign';
export const reducer = combineReducers(objectAssign({}, REDUCERS));
