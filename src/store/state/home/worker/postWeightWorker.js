import { put } from 'redux-saga/effects';
import i18n from 'i18next';
import Endpoint, { urlFactory } from '../../../constants/Endpoint';
import EndpointStatus from '../../../constants/EndpointStatus';
import LoginErrorCode from '../constants/LoginErrorCode';
import ErrorCode from '../../../constants/ErrorCode';
import Error from '../../../../entities/Error';
import postData from '../../../utils/fetchMethod/postData';
import postWeightErrorActionCreator from '../actionCreator/postWeightErrorActionCreator';
import getWeightSubWorker from './subworker/getWeightSubWorker';
import postWeightSuccessActionCreator from '../actionCreator/postWeightSuccessActionCreator';
import Notification from '../../../../entities/Notification';

function* postWeightWorker(action) {
  const {
    date,
    weight,
    note,
  } = action.payload || {};

  const response = yield postData({
    url: urlFactory(Endpoint.WEIGHT),
    data: {
      date,
      weight: `${weight}`,
      ...(note && { note }),
    },
  });

  const {
    data,
    status,
  } = response || {};

  if (status === EndpointStatus.NOT_FOUND) {
    return yield put(postWeightErrorActionCreator([new Notification({
      message: 'Weights not found',
      code: LoginErrorCode.NOT_FOUND,
    })]));
  }

  if (status === EndpointStatus.BAD_REQUEST) {
    return yield put(postWeightErrorActionCreator([new Notification({
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
      return yield put(postWeightErrorActionCreator(errors));
    }
    const notifications = [new Notification({ message: i18n.t('home.snackbar.postSuccess') })];

    return yield put(postWeightSuccessActionCreator(result?.weightById, notifications));
  }

  // Generic errorCode
  return yield put(postWeightErrorActionCreator([new Error({
    code: ErrorCode.DEFAULT,
  })]));
}

export default postWeightWorker;
