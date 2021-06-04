import { actionStatusSuccess } from '../../../constants/ActionStatus';
import { GET_HOME } from '../actionCreator/getHomeActionCreator';
import { LOGOUT } from '../../authentication/logout/actionCreator/logoutActionCreator';
import { POST_WEIGHT } from '../actionCreator/postWeightActionCreator';
import { DELETE_WEIGHT } from '../actionCreator/deleteWeightActionCreator';

const weightByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case actionStatusSuccess(GET_HOME):
    case actionStatusSuccess(POST_WEIGHT):
    case actionStatusSuccess(DELETE_WEIGHT):
      if (action.payload.weightById) {
        return action.payload.weightById;
      }
      return state;
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default weightByIdReducer;
