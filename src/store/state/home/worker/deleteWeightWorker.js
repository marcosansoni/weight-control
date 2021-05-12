import { put } from 'redux-saga/effects';
import Endpoint, { urlFactory } from '../../../constants/Endpoint';
import EndpointStatus from '../../../constants/EndpointStatus';
import LoginErrorCode from '../constants/LoginErrorCode';
import ErrorCode from '../../../constants/ErrorCode';
import Error from '../../../../entities/Error';
import getWeightSubWorker from './subworker/getWeightSubWorker';
import deleteWeightErrorActionCreator from '../actionCreator/deleteWeightErrorActionCreator';
import deleteData from '../../../utils/fetchMethod/deleteData';
import deleteWeightSuccessActionCreator from '../actionCreator/deleteWeightSuccessActionCreator';

function* deleteWeightWorker(action) {
  const { id } = action.payload || {};

  const response = yield deleteData({
    url: urlFactory(`${Endpoint.WEIGHT}/${id}`),
  });

  const {
    data,
    status,
  } = response || {};

  if (status === EndpointStatus.NOT_FOUND) {
    return yield put(deleteWeightErrorActionCreator([new Error({
      message: 'Weights not found',
      code: LoginErrorCode.NOT_FOUND,
    })]));
  }

  if (status === EndpointStatus.BAD_REQUEST) {
    return yield put(deleteWeightErrorActionCreator([new Error({
      message: data.errors?.[0],
      code: LoginErrorCode.NOT_FOUND,
    })]));
  }

  if (status === EndpointStatus.SUCCESS) {
    const {
      errors,
      result,
    } = yield getWeightSubWorker();
    if (errors) {
      return yield put(deleteWeightErrorActionCreator(errors));
    }
    return yield put(deleteWeightSuccessActionCreator(result?.weightById));
  }

  // Generic errorCode
  return yield put(deleteWeightErrorActionCreator([new Error({
    code: ErrorCode.DEFAULT,
  })]));
}

export default deleteWeightWorker;
