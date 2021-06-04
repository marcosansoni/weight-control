import { actionStatusSuccess } from '../../../constants/ActionStatus';
import { GET_HOME } from './getHomeActionCreator';

const getHomeSuccessActionCreator = (weightById) => ({
  type: actionStatusSuccess(GET_HOME),
  payload: { weightById },
});

export default getHomeSuccessActionCreator;
