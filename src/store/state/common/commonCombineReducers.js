import { combineReducers } from 'redux';
import fetchReducer from './reducer/fetchReducer';

const commonCombineReducers = combineReducers({
  fetch: fetchReducer,
});

export default commonCombineReducers;
