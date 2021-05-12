import { combineReducers } from 'redux';
import homeErrorsReducer from './reducer/homeErrorsReducer';
import weightByIdReducer from './reducer/weightByIdReducer';

const homeCombineReducers = combineReducers({
  errors: homeErrorsReducer,
  weightById: weightByIdReducer,
});

export default homeCombineReducers;
