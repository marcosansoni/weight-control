import { actionStatusRequest } from '../../../constants/ActionStatus';

export const POST_WEIGHT = 'POST_WEIGHT';

const postWeightActionCreator = (date, weight, note) => ({
  type: actionStatusRequest(POST_WEIGHT),
  payload: { date, weight, note },
});

export default postWeightActionCreator;
