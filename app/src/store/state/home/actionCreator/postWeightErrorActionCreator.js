import { actionStatusError } from '../../../constants/ActionStatus';
import { POST_WEIGHT } from './postWeightActionCreator';

const postWeightErrorActionCreator = (errors) => ({
  type: actionStatusError(POST_WEIGHT),
  payload: { errors },
});

export default postWeightErrorActionCreator;
