import { combineReducers } from 'redux';
import homeNotificationReducer from './reducer/homeNotificationReducer';
import weightByIdReducer from './reducer/weightByIdReducer';

const homeCombineReducers = combineReducers({
  notification: homeNotificationReducer,
  weightById: weightByIdReducer,
});

export default homeCombineReducers;
