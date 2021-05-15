import { actionStatusSuccess } from '../../../constants/ActionStatus';
import { DELETE_WEIGHT } from './deleteWeightActionCreator';

const deleteWeightSuccessActionCreator = (weightById, notifications) => ({
  type: actionStatusSuccess(DELETE_WEIGHT),
  payload: { weightById, notifications },
});

export default deleteWeightSuccessActionCreator;
