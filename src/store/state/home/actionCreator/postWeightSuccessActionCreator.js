import { actionStatusSuccess } from '../../../constants/ActionStatus';
import { POST_WEIGHT } from './postWeightActionCreator';

const postWeightSuccessActionCreator = (weightById, notifications) => ({
  type: actionStatusSuccess(POST_WEIGHT),
  payload: { weightById, notifications },
});

export default postWeightSuccessActionCreator;
