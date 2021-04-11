import { actionStatusRequest } from '../../../../constants/ActionStatus';

export const POST_LOGIN = 'POST_LOGIN';

const postLoginActionCreator = (email, password) => ({
  type: actionStatusRequest(POST_LOGIN),
  payload: { email, password },
});

export default postLoginActionCreator;
