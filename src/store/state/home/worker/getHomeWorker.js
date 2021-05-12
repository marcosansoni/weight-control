import { put } from 'redux-saga/effects';
import Endpoint, { urlFactory } from '../../../constants/Endpoint';
import EndpointStatus from '../../../constants/EndpointStatus';
import LoginErrorCode from '../constants/LoginErrorCode';
import getHomeSuccessActionCreator from '../actionCreator/getHomeSuccessActionCreator';
import ErrorCode from '../../../constants/ErrorCode';
import getHomeErrorActionCreator from '../actionCreator/getHomeErrorActionCreator';
import Error from '../../../../entities/Error';
import getData from '../../../utils/fetchMethod/getData';
import Weight from '../../../../entities/Weight';

function* getHomeWorker() {
  const response = yield getData({
    url: urlFactory(Endpoint.WEIGHT),
  });

  const {
    data,
    status,
  } = response || {};

  if (status === EndpointStatus.NOT_FOUND) {
    return yield put(getHomeErrorActionCreator([new Error({
      message: 'Weights not found',
      code: LoginErrorCode.NOT_FOUND,
    })]));
  }

  if (status === EndpointStatus.BAD_REQUEST) {
    return yield put(getHomeErrorActionCreator([new Error({
      message: data.errors?.[0],
      code: LoginErrorCode.NOT_FOUND,
    })]));
  }

  if (status === EndpointStatus.SUCCESS) {
    const weightById = {};
    (data?.result?.entities || []).forEach((w) => {
      weightById[w.id] = new Weight(w);
    });
    return yield put(getHomeSuccessActionCreator(weightById));
  }

  // Generic errorCode
  return yield put(getHomeErrorActionCreator([new Error({
    code: ErrorCode.DEFAULT,
  })]));
}

export default getHomeWorker;
