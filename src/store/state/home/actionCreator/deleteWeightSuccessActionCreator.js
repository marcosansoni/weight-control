import { actionStatusSuccess } from '../../../constants/ActionStatus';
import { DELETE_WEIGHT } from './deleteWeightActionCreator';

const deleteWeightSuccessActionCreator = (weightById) => ({
  type: actionStatusSuccess(DELETE_WEIGHT),
  payload: { weightById },
});

export default deleteWeightSuccessActionCreator;
