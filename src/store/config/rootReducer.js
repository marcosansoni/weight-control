import { combineReducers } from 'redux';
import commonCombineReducers from '../state/common/commonCombineReducers';

export default combineReducers({
  common: commonCombineReducers,
  // Insert here main reducers
});
