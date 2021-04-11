import { put } from 'redux-saga/effects';
import Endpoint, { urlFactory } from '../../../../constants/Endpoint';
import postData from '../../../../utils/fetchMethod/postData';
import EndpointStatus from '../../../../constants/EndpointStatus';
import LoginErrorCode from '../constants/LoginErrorCode';
import postLoginSuccessActionCreator from '../actionCreator/postLoginSuccessActionCreator';
import Session from '../../../../../entities/Session';
import ErrorCode from '../../../../constants/ErrorCode';
import postLoginErrorActionCreator from '../actionCreator/postLoginErrorActionCreator';
import Error from '../../../../../entities/Error';

function* postLoginWorker(action) {
  const {
    email,
    password,
  } = action?.payload || {};

  const response = yield postData({
    url: urlFactory(Endpoint.LOGIN),
    data: { email, password },
  });

  const {
    data,
    status,
  } = response || {};

  if (status === EndpointStatus.NOT_FOUND) {
    return yield put(postLoginErrorActionCreator([new Error({
      message: 'User not found',
      code: LoginErrorCode.NOT_FOUND,
    })]));
  }

  console.log(data);

  if (status === EndpointStatus.BAD_REQUEST) {
    return yield put(postLoginErrorActionCreator([new Error({
      message: data.errors?.[0],
      code: LoginErrorCode.NOT_FOUND,
    })]));
  }

  if (status === EndpointStatus.SUCCESS) {
    return yield put(postLoginSuccessActionCreator(new Session({ ...data?.result, email })));
  }

  // Generic errorCode
  return yield put(postLoginErrorActionCreator([new Error({
    code: ErrorCode.DEFAULT,
  })]));
}

export default postLoginWorker;
