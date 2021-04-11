import { combineReducers } from 'redux';
import commonCombineReducers from '../state/common/commonCombineReducers';
import authenticationCombineReducers from '../state/authentication/authenticationCombineReducers';

export default combineReducers({
  common: commonCombineReducers,
  authentication: authenticationCombineReducers,
});
