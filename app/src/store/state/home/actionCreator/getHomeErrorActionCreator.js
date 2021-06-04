import { actionStatusError } from '../../../constants/ActionStatus';
import { GET_HOME } from './getHomeActionCreator';

const getHomeErrorActionCreator = (errors) => ({
  type: actionStatusError(GET_HOME),
  payload: { errors },
});

export default getHomeErrorActionCreator;
