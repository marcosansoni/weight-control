import { actionStatusError, actionStatusSuccess } from '../../../constants/ActionStatus';
import { GET_HOME } from '../actionCreator/getHomeActionCreator';
import { POST_WEIGHT } from '../actionCreator/postWeightActionCreator';
import { DELETE_WEIGHT } from '../actionCreator/deleteWeightActionCreator';
import { HOME_RESET_ERROR } from '../actionCreator/resetHomeErrorActionCreator';

const homeNotificationReducer = (state = [], action) => {
  switch (action.type) {
    case actionStatusError(GET_HOME):
    case actionStatusError(POST_WEIGHT):
    case actionStatusError(DELETE_WEIGHT):
      if (action?.payload?.errors) {
        return action.payload.errors;
      }
      return state;
    case actionStatusSuccess(DELETE_WEIGHT):
    case actionStatusSuccess(POST_WEIGHT):
      if (action?.payload?.notifications) {
        return action.payload.notifications;
      }
      return state;
    case HOME_RESET_ERROR:
      return [];
    default:
      return state;
  }
};

export default homeNotificationReducer;
