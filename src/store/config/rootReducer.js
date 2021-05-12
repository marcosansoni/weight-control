import { combineReducers } from 'redux';
import commonCombineReducers from '../state/common/commonCombineReducers';
import authenticationCombineReducers from '../state/authentication/authenticationCombineReducers';
import homeCombineReducers from '../state/home/homeCombineReducers';

export default combineReducers({
  common: commonCombineReducers,
  authentication: authenticationCombineReducers,
  home: homeCombineReducers,
});
