import { actionStatusRequest } from '../../../constants/ActionStatus';

export const GET_HOME = 'GET_HOME';

const getHomeActionCreator = () => ({
  type: actionStatusRequest(GET_HOME),
});

export default getHomeActionCreator;
