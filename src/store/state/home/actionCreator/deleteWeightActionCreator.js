import { actionStatusRequest } from '../../../constants/ActionStatus';

export const DELETE_WEIGHT = 'DELETE_WEIGHT';

const deleteWeightActionCreator = (id) => ({
  type: actionStatusRequest(DELETE_WEIGHT),
  payload: { id },
});

export default deleteWeightActionCreator;
