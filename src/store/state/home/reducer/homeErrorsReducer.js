import { actionStatusError } from '../../../constants/ActionStatus';
import { GET_HOME } from '../actionCreator/getHomeActionCreator';
import { POST_WEIGHT } from '../actionCreator/postWeightActionCreator';
import { DELETE_WEIGHT } from '../actionCreator/deleteWeightActionCreator';

const homeErrorsReducer = (state = [], action) => {
  switch (action.type) {
    case actionStatusError(GET_HOME):
    case actionStatusError(POST_WEIGHT):
    case actionStatusError(DELETE_WEIGHT):
      if (action?.payload?.errors) {
        return action.payload.errors;
      }
      return state;
    default:
      return state;
  }
};

export default homeErrorsReducer;
