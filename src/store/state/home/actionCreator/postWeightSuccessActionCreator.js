import { actionStatusSuccess } from '../../../constants/ActionStatus';
import { POST_WEIGHT } from './postWeightActionCreator';

const postWeightSuccessActionCreator = (weightById) => ({
  type: actionStatusSuccess(POST_WEIGHT),
  payload: { weightById },
});

export default postWeightSuccessActionCreator;
