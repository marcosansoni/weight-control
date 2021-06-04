import { actionStatusError } from '../../../constants/ActionStatus';
import { DELETE_WEIGHT } from './deleteWeightActionCreator';

const deleteWeightErrorActionCreator = (errors) => ({
  type: actionStatusError(DELETE_WEIGHT),
  payload: { errors },
});

export default deleteWeightErrorActionCreator;
